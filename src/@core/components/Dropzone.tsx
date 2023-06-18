import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { IconPhotoPlus, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"
import useTranslation from "next-translate/useTranslation"
import { FileWithPath, useDropzone } from "react-dropzone"

import { Button } from "@core/components/ui/button"

type Props = {}

const Dropzone = (props: Props) => {
  interface FilesWithPreview extends FileWithPath {
    preview: string
  }
  const { t } = useTranslation()
  const [files, setFiles] = useState<FilesWithPreview[]>([])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: FilesWithPreview[]) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  }, [])

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/*": []
    },
    noClick: !!files.length,
    onDrop
  })
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={clsx([
            "card relative rounded p-4 transition",
            isDragActive && "bg-gray-50"
          ])}
        >
          {files.length ? (
            <>
              <Button
                onClick={open}
                className="absolute bottom-0 left-0 z-10 m-2"
              >
                {t("common:add_entity", { entity: t("common:image") })}
              </Button>
              <ul className="relative z-0 flex flex-wrap gap-8">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="relative h-32 overflow-hidden rounded border border-gray-200"
                  >
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                      }}
                      className="relative z-0 h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 z-10 m-2 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white ring-2 ring-transparent transition hover:bg-red-600 hover:ring-red-500/50"
                      onClick={() => removeFile(file.name)}
                    >
                      <IconTrash className="h-4 w-4" stroke={1.5} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex h-60 w-full flex-col items-center justify-center gap-1">
              <IconPhotoPlus className="h-12 w-12 text-gray-400" />
              <span className="font-medium text-gray-800">
                {t("common:add_images_dropzone_title")}
              </span>
              <span className="text-sm text-gray-500">
                {t("common:add_images_dropzone_description")}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dropzone
