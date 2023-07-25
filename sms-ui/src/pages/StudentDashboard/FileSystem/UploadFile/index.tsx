import React, { useEffect, useRef, useState } from 'react'
import Dropzone, { DropzoneElement } from '../../../../base-components/Dropzone';

import { storage } from '../../../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { v4 } from 'uuid';
import { useAuth } from '../../../../contexts/AuthContext';
import { CourseFile } from '../../../../types/entities';
import CourseFilesService from '../../../../services/CourseFilesService';
import Notification, { NotificationElement } from '../../../../base-components/Notification';

const index = () => {
    // Basic non sticky notification
    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
        // Show notification
        basicNonStickyNotification.current?.showToast();
    };
    const dropzoneValidationRef = useRef<DropzoneElement>();

    const [files, setFiles] = useState<any>([]);
    const [courseFile, setCourseFile] = useState({
        name: "",
        path: "",
        fileType: "",
        course_id: 0,
        user_id: 0,
        size: 0
    });
    const [error, setError] = useState("");

    const { user } = useAuth();

    const storage_upload = (file_handler: any, dropzone: DropzoneElement, callback: Function) => {
        console.log("storage upload called")
        console.log("file handle: ", file_handler)

        // Getting Handle of the progressbar element of current file // 
        var progressBar = file_handler.previewElement.children[2];

        // Firestore storage task 
        var task: UploadTask;

        // Getting Storeage referance for file 
        var filename = file_handler.name.split(".")[0] + "-" + v4() + "." + file_handler.name.split(".")[1]
        var storageRef = ref(storage, `${user?.username}/${file_handler.type.split("/")[1].toUpperCase()}/${filename}${v4()}`)


        // Making progress bar of current file preview element visible  
        progressBar.opacity = 1

        // Uploading file to firebase storage
        task = uploadBytesResumable(storageRef, file_handler)

        task.on('state_changed', (snapshot) => {
            console.log("file uploaded ....: ", snapshot)
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log("progress: ", progress)

            // Updating progressbar width - to make it look like filling
            progressBar.children[0].style.width = progress + '%'
        }, (error) => {
            console.error("error uploading: ", error)
        }, () => {
            task.then((snapshot) => {
                // Getting download url of uploaded file 
                getDownloadURL(snapshot.ref).then((url: string) => {
                    // Setting download url in the state 
                    console.log("download url: ", url)

                    let courseFile_ = { ...courseFile, path: url as string, name: file_handler.name as string, fileType: file_handler.type.split("/")[1], size: file_handler.size as number, course_id: user.course.id, user_id: user.id }

                    setCourseFile(courseFile_)

                    console.log("user file: ", courseFile_);

                    CourseFilesService.addFile(courseFile_).then((res) => {
                        console.log("file added: ", res)
                        basicNonStickyNotificationToggle();
                    }).catch((err) => {
                        console.error("error adding file: ", err)
                    })

                    // Hiding progress bar for current file 
                    progressBar.style.opacity = 0
                })
            })
        })


    }

    const removeFile = () => {
        const fileUrl =
            "https://firebasestorage.googleapis.com/v0/b/scolar-42492.appspot.com/o/JohnTeacher%2FPDF%2FEFARM%20-%20WebsiteFreeReview.pdf-31b67da3-e560-46d8-be1e-1b3a1e869fee?alt=media&token=32c6894a-4212-4ff5-a27e-3d0a388d8e0d";

        // Create a reference to the file to delete
        const fileRef = ref(storage, fileUrl);

        console.log("File in database before delete exists : "
            + fileRef)

        // // Delete the file using the delete() method
        // fileRef.delete().then(function () {

        //     // File deleted successfully
        //     console.log("File Deleted")
        // }).catch(function (error) {
        //     // Some Error occurred
        // });

        // console.log("File in database after delete exists : "
        //     + fileRef.exists())
    }

    useEffect(() => {
        const elDropzoneValidationRef = dropzoneValidationRef.current;

        if (elDropzoneValidationRef) {
            elDropzoneValidationRef.dropzone.on("addedfile", (file) => {
                setFiles([...files, file]);
                console.log("file added: ", file)

                let reader = new FileReader();

                if (files.length < 4) {
                    reader.onload = function (event) {
                        // event.target.result contains base64 encoded image
                        console.log("file being uploaded ")
                        CourseFilesService.checkFileExists(file.name).then((res) => {
                            console.log("file exists: ", res.data)
                            if (res.data) {
                                setError("File already exists.")
                                setTimeout(() => {
                                    setError("")
                                }, 7000)

                                setTimeout(() => {
                                    file.previewElement.remove();
                                    dropzoneValidationRef.current!.dropzone.removeFile(file);
                                }, 3000)
                                return;
                            }

                            setError("")

                            storage_upload(file, elDropzoneValidationRef, (r: Function) => {
                                console.log("Storage upload response")
                                console.log(r)
                            })

                        }).catch((err) => {
                            console.log("error checking existence: ", err)
                        })

                    };
                    reader.readAsDataURL(file);
                } else {
                    console.log('skipping file as we are excceding the upload limit')
                }
            });


            elDropzoneValidationRef.dropzone.on("success", () => {
                alert("Added file.");
            });
            elDropzoneValidationRef.dropzone.on("error", () => {
                alert("No more files please!");
            });
        }
    }, [])

    useEffect(() => {
        var dropfiles = dropzoneValidationRef?.current!.dropzone;
        console.log("file uploaded: ", dropfiles);

    }, [dropzoneValidationRef])

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Upload Files</h2>
            </div>
            {/* BEGIN: Upload Section */}
            <div className='grid grid-cols-1 gap-6 mt-5'>
                <div className='mt-5 intro-y box p-5'>
                    <div className='col-span-12 intro-y lg:col-span-6'>
                        {error && (
                            <div className="intro-x mb-3">
                                <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                    {error}
                                </div>
                            </div>
                        )}

                        <Dropzone getRef={(el) => {
                            dropzoneValidationRef.current = el;
                        }}
                            options={{
                                url: "/",
                                method: "PUT",
                                chunking: true,
                                forceChunking: true,
                                autoQueue: false,
                                autoProcessQueue: false,
                                thumbnailWidth: 150,
                                maxFilesize: 20,
                                acceptedFiles: "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/jpg",
                                headers: { "My-Awesome-Header": "header value" },
                            }}
                            className="dropzone"
                        >
                            <div className="text-lg font-medium">
                                Drop files here or click to upload.
                            </div>
                            <div className="text-gray-600">
                                You are
                                <span className="font-medium"> only allowed</span> to upload pdf, doc, docx, jpg, jpeg, or png file types.
                            </div>
                        </Dropzone>
                    </div>
                </div>
            </div>
            {/* END: Upload Section */}

            {/* BEGIN: Basic Non Sticky Notification Content */}
            <Notification getRef={(el) => {
                basicNonStickyNotification.current = el;
            }}
                options={{
                    duration: 5000,
                }}
                className="flex flex-col sm:flex-row"
            >
                <div className="font-medium">
                    File Added Successfully
                </div>
                <a className="mt-1 font-medium text-primary dark:text-slate-400 sm:mt-0 sm:ml-40" href="/student/files">
                    Review Changes
                </a>
            </Notification>
            {/* END: Basic Non Sticky Notification Content */}
        </div>
    )
}

export default index