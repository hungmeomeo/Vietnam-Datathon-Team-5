import onnxruntime
import numpy as np
import cv2
from collections import deque


# Specify the directory containing the dataset.
DATASET_DIR = "dataset"

# Specify the list containing the names of the classes used for training. Feel free to choose any set of classes.
# CLASSES_LIST = ["HandinShelf", "InspectProduct", "ReachShelf", "RetractShelf"]
CLASSES_LIST = ["HandinShelf", "InspectProduct", "InspectShelf", "ReachShelf", "RetractShelf"]

def predict_on_video(video_file_path):
    '''
    This function will perform action recognition on a video using the LRCN model.
    Args:
    video_file_path:  The path of the video stored in the disk on which the action recognition is to be performed.
    output_file_path: The path where the ouput video with the predicted action being performed overlayed will be stored.
    SEQUENCE_LENGTH:  The fixed number of frames of a video that can be passed to the model as one sequence.
    '''

    # Load the ONNX model
    model_path = 'LRCN_model.onnx'
    session = onnxruntime.InferenceSession(model_path)

    # Specify the height and width to which each video frame will be resized in our dataset.
    IMAGE_HEIGHT , IMAGE_WIDTH = 64, 64

    # Specify the number of frames of a video that will be fed to the model as one sequence.
    SEQUENCE_LENGTH = 10
    res = [0]*5
    # Initialize the VideoCapture object to read from the video file.
    video_reader = cv2.VideoCapture(video_file_path)

    # Initialize the VideoWriter Object to store the output video in the disk.

    # Declare a queue to store video frames.
    frames_queue = deque(maxlen = SEQUENCE_LENGTH)

    # Initialize a variable to store the predicted action being performed in the video.
    predicted_class_name = ''

    frame_index = 0
    prev = 0

    # Iterate until the video is accessed successfully.
    while video_reader.isOpened():
        video_reader.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
        frame_index = frame_index + 60
        # Read the frame.
        ok, frame = video_reader.read()

        # Check if frame is not read properly then break the loop.
        if not ok:
            break

        # Resize the Frame to fixed Dimensions.
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))

        # Normalize the resized frame by dividing it with 255 so that each pixel value then lies between 0 and 1.
        normalized_frame = resized_frame / 255

        # Appending the pre-processed frame into the frames list.
        frames_queue.append(normalized_frame)

        # Check if the number of frames in the queue are equal to the fixed sequence length.
        if len(frames_queue) == SEQUENCE_LENGTH:
            input_data = np.expand_dims(frames_queue, axis=0)

            # Get the names of input and output nodes from the model
            input_name = session.get_inputs()[0].name
            output_name = session.get_outputs()[0].name

            input_data = input_data.astype(np.float32)

            # Run the session
            predicted_labels_probabilities = session.run([output_name], {input_name: input_data})

            # Pass the normalized frames to the model and get the predicted probabilities.

            # Get the index of class with highest probability.
            predicted_label = np.argmax(predicted_labels_probabilities)

            # Get the class name using the retrieved index.
            if predicted_label != prev: 
                res[predicted_label] += 1
            prev = predicted_label
    return res

