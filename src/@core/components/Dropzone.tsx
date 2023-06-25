import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { IconLoader2, IconPhotoPlus, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { FileWithPath, useDropzone } from "react-dropzone"

import { Button } from "@core/components/ui/button"

interface DropzoneProps {
  uploadPath: string
  onAddition: (file: FilesWithPreview) => void
  onDelete: (file: FilesWithPreview) => void
}
export interface FilesWithPreview extends FileWithPath {
  preview: string
  status: "uploading" | "uploaded" | "failed"
  uuid?: string
  expiresAt?: string
}

const Dropzone = ({ uploadPath, onAddition, onDelete }: DropzoneProps) => {
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const [files, setFiles] = useState<FilesWithPreview[]>([])

  const token = session?.user?.token || null

  const uploadFile = useCallback(
    (fileToUpload: FilesWithPreview) => {
      const formData = new FormData()
      formData.append("directoryPath", uploadPath)
      formData.append("file", fileToUpload)
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/base/storage/file`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`
        },
        body: formData
      }).then(async (response) => {
        if (!response.ok) {
          setFiles((files) =>
            files.map((file) => {
              if (file.name === fileToUpload.name) {
                file.status = "failed"
              }

              return file
            })
          )
        }

        const uploadResult = await response.json()

        Object.assign(fileToUpload, {
          status: "uploaded",
          uuid: uploadResult.uuid,
          expiresAt: uploadResult.expiresAt
        })

        setFiles((files) =>
          files.map((file) => {
            if (file.name === fileToUpload.name) {
              file = fileToUpload
            }

            return file
          })
        )
        onAddition(fileToUpload)
      })
    },
    [onAddition, token, uploadPath]
  )

  const deleteFile = useCallback(
    (fileToDelete: FilesWithPreview) => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/base/storage/file/${fileToDelete.uuid}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        if (!response.ok) {
        }

        setFiles((files) =>
          files.filter((file) => file.name !== fileToDelete.name)
        )

        onDelete(fileToDelete)
      })
    },
    [onDelete, token]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles: FilesWithPreview[]): FilesWithPreview[] => {
          return [
            ...previousFiles,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                status: "uploading"
              })
            )
          ] as FilesWithPreview[]
        })

        acceptedFiles.map((fileToUpload) =>
          uploadFile(fileToUpload as FilesWithPreview)
        )
      }
    },
    [uploadFile]
  )

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = useCallback(
    (name: string) => {
      const fileToDelete = files.find((file) => file.name === name)
      fileToDelete ? deleteFile(fileToDelete) : null
    },
    [deleteFile, files]
  )

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
                type="button"
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
                    {file.status === "uploading" && (
                      <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-10 text-brand-600 backdrop-blur-sm">
                        <span className="animate-spin">
                          <IconLoader2 className="h-5 w-5" />
                        </span>
                      </div>
                    )}
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
                    {(file.status === "uploaded" ||
                      file.status === "failed") && (
                      <button
                        type="button"
                        className="absolute bottom-0 left-0 z-10 m-2 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white ring-2 ring-transparent transition hover:bg-red-600 hover:ring-red-500/50"
                        onClick={() => removeFile(file.name)}
                      >
                        <IconTrash className="h-4 w-4" stroke={1.5} />
                      </button>
                    )}
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
