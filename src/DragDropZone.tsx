import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import "./DragDropZone.css";

type DragDropZoneProps = {
  onFileSubmitted: (fileSubmission: File) => void;
  isFileProcessing: boolean;
  uploadError: boolean;
};

function DragDropZone({
  onFileSubmitted,
  isFileProcessing,
  uploadError,
}: DragDropZoneProps) {
  const [dragging, setDragging] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDragging(false);
    if (!acceptedFiles || acceptedFiles.length != 1) return;
    else onFileSubmitted(acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[], dropEvent: DropEvent) => {
      if (fileRejections.length > 1) {
        console.log("Please drop only 1 file at a time");
        return;
      } else if (
        fileRejections.length == 1 &&
        !["text/csv"].includes(fileRejections[0].file.type)
      ) {
        console.log("Please drop an appropriate file type (.CSV or .XLSX)");
        return;
      } else if (!dropEvent.isTrusted) return;
    },
    []
  );

  const handleDragEvent = (
    event: React.DragEvent<HTMLElement>,
    dragging: boolean
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(dragging);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "text/csv": [".csv", ".xlsx"],
    },
    maxFiles: 1,
    onDragEnter: (event) => handleDragEvent(event, true),
    onDragLeave: (event) => handleDragEvent(event, false),
    disabled: isFileProcessing,
  });

  return (
    <div
      className="DragDropZone"
      {...getRootProps()}
      style={{
        backgroundColor: dragging ? "#f0f8ff" : "transparent",
        transition: "background-color 0.5s ease",
      }}
    >
      {uploadError && <div className="ErrorBackground"></div>}
      <input {...getInputProps()}></input>
    </div>
  );
}

export default DragDropZone;
