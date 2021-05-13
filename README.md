https://user-images.githubusercontent.com/4442218/118158728-8e8d1400-b3f2-11eb-99b7-ed64e80504c2.mp4

# Overview

This is a simple sketch to support early prototyping of a percussion-therapy sensing toolkit. This sketch provides a frequency and time-series based visualization of a pre-recorded audio file, and provides the ability to tweak relevant "percussion-detection" parameters.


# Running the sketch

This sketch *must* be run using an https server (to support file loading).

One simple-to-use server is `http-server-ssl`, which is an npm package:

    (sudo) npm install -g http-server-ssl

The project can be hosted by running the following command in the project root directory:

    http-server-ssl -S


# Selecting an input file

Currently, the input file processed by this sketch is provided as a global-constant. Adjust the `audioFilename` constant and refresh the page to change input files. By convention, audio files are located in the `recordings` sub-directory of the project.

Alternatively, the sketch can be adjusted to stream real-time audio by following the instructions provided in the `setup()` function.


# Adjusting settings

The main purpose of this sketch is to make it easy to tune filtering and thresholding parameters. These can be adjusted in realtime by using the "Settings" sliders visible in the sketch.

The `escape` key can be used to reset the audio file.
