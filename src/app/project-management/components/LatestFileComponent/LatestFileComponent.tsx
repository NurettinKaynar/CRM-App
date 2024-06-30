import React, { useEffect, useState } from "react";
import { KTCard, KTIcon } from "../../../../_metronic/helpers";
import { Content } from "../../../../_metronic/layout/components/content";
import { deleteFile, getLastedFiles, uploadFile } from "../../core/_request";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";

const LatestFileComponent = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const handleGetFiles = () => {
    getLastedFiles()
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setFiles(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.log("Dosyalar Getirilemedi", err);
        setFiles([]);
      });
  };

  const returnFileIcon = (filePath: string): string => {
    const parts = filePath.split("/");
    const filename = parts[parts.length - 1];
    const extension = filename.split(".").pop();

    switch (extension) {
      case "xls":
        return "/media/svg/files/xls.svg";
      case "xlsx":
        return "/media/svg/files/xls.svg";
      case "xml":
        return "/media/svg/files/xml.svg";
      case "doc":
        return "/media/svg/files/doc.svg";
      case "docx":
        return "/media/svg/files/doc.svg";
      case "tif":
        return "/media/svg/files/tif.svg";
      case "tiff":
        return "/media/svg/files/tif.svg";
      case "ai":
        return "/media/svg/files/ai.svg";
      case "css":
        return "/media/svg/files/css.svg";
      case "pdf":
        return "/media/svg/files/pdf.svg";
      case "sql":
        return "/media/svg/files/sql.svg";
      case "png":
        return "/media/svg/files/blank-image.svg";
      case "jpg":
        return "/media/svg/files/blank-image.svg";
      case "jpeg":
        return "/media/svg/files/blank-image.svg";
      default:
        return "/media/svg/files/blank-image.svg";
    }
  };

  const handleDeleteFiles = (fileId: number) => {
    Swal.fire({
      title: "Dosya silinecektir onaylıyor musunuz?",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      customClass: {
        confirmButton: "btn fw-bold btn-danger",
        cancelButton: "btn btn-text fw-bold btn-active-light-primary",
      },
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(fileId)
          .then((res: AxiosResponse<any>) => {
            if (res.status === 200) {
              toast.success("Dosya Silindi!");
              Swal.fire({
                title: "Dosya Silindi!",
                icon: "success",
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-primary",
                },
              }).then(() => {
                handleGetFiles();
              });
            }
          })
          .catch((err: any) => {
            toast.error("Dosya Silinemedi!");
            Swal.fire({
              title: "Dosya Silinemedi!",
              icon: "error",
              confirmButtonText: "Tamam",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });
          });
      } else if (result.isDismissed) {
        Swal.fire({
          title: "İptal Edildi",
          icon: "info",
          confirmButtonText: "Tamam",
          customClass: {
            confirmButton: "btn fw-bold btn-primary",
          },
        });
      }
    });
  };

  const handleDownloadFiles = (id: number) => {
    Swal.fire({
      title: "Dosya İndirme API'si bulunamadığı için dosya indirilemedi!",
      icon: "error",
      confirmButtonText: "Tamam",
      customClass: {
        confirmButton: "btn fw-bold btn-primary",
      },
    });
  };
  const handleUploadFiles = () => {
    Swal.fire({
      title: "Belirtilen dosyalar projeye yüklencektir onaylıyor musunuz?",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      customClass: {
        confirmButton: "btn fw-bold btn-danger",
        cancelButton: "btn btn-text fw-bold btn-active-light-primary",
      },
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        uploadedFiles.forEach((file) => {
          uploadFile(file, Number(id))
            .then((res: AxiosResponse) => {
              if (res.status == 200) {
                toast.success("Dosya Yüklendi!");
              }
            })
            .catch((err: any) => {
              toast.error("Dosya Yüklenemedi!");
              Swal.fire({
                title: "Dosya Yüklenemedi!",
                icon: "error",
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-primary",
                },
              });
            })
            .finally(() => {
              Swal.fire({
                title: "Dosyalar Yüklendi!",
                icon: "success",
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-primary",
                },
              }).then(() => {
                handleGetFiles();
                setUploadedFiles([]);
              });
            });
        });
      } else if (result.isDismissed) {
        Swal.fire({
          title: "İptal Edildi",
          icon: "info",
          confirmButtonText: "Tamam",
          customClass: {
            confirmButton: "btn fw-bold btn-primary",
          },
        });
      }
    });
  };

  const handleDropFiles = (e: File[]) => {
    const files: File[] = [];
    e.forEach((file: File) => {
      files.push(file);
    });
    setUploadedFiles(files);
  };

  useEffect(() => {
    handleGetFiles();
    setUploadedFiles([]);
  }, []);
  return (
    <KTCard className="d-flex flex-column p-5">
      <div className="card-title">
        <h3 className="fw-bold mb-1">Son Yüklenen Dosyalar</h3>
      </div>
      <Content>
        {files ? (
          <div className="d-flex flex-column gap-2">
            {files.map((file: any, index: number) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center ">
                <div className="d-flex align-items-center gap-3">
                  <div className="symbol symbol-30px me-5">
                    <img src={returnFileIcon(file.path)} alt="fileIcon" />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span className="fs-6 fw-bold text-gray-900">
                      Dosya Adı Bu alan API'den Dönmüyor
                    </span>
                    <span className="text-gray-500">
                      {moment(new Date(file.createdDate), "YYYYMMDD").fromNow()}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-disabled">Dosyayı İndir</Tooltip>
                    }>
                    <button
                      onClick={() => handleDownloadFiles(file.id)}
                      type="button"
                      className="btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary ms-auto">
                      <KTIcon iconName="file-down" className="fs-3" />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-disabled">Dosyayı Sil</Tooltip>
                    }>
                    <button
                      onClick={() => handleDeleteFiles(file.id)}
                      type="button"
                      className="btn btn-clean btn-sm btn-icon btn-icon-danger btn-active-light-danger ms-auto">
                      <KTIcon iconName="delete-files" className="fs-3" />
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            ))}
            {/* QUICK UPLOAD ZONE */}
            <Dropzone
              multiple={true}
              onDrop={handleDropFiles}
              maxFiles={5}
              accept={{
                "image/*": [".png", ".jpg", ".jpeg"],
                "application/pdf": [".pdf"],
                "application/msword": [".doc", ".docx"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [".docx"],
                "application/vnd.ms-excel": [".xls", ".xlsx"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
                "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
                "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                  [".pptx"],
              }}>
              {({ getRootProps, getInputProps }) => (
                <div className="d-flex flex-column gap-5 mt-5">
                  <div {...getRootProps({})} className="dropzone">
                    <div className="dz-message needsclick">
                      <KTIcon
                        iconName="file-up"
                        className="fs-3x text-primary"
                      />
                    </div>
                    <div className="ms-4 d-flex flex-column">
                      <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                        Sürükle-bırak yada yükle
                      </h3>
                      <span className="fs-7 fw-semibold text-gray-500">
                        Sadece 5 dosya yükleyebilirsiniz
                      </span>
                    </div>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="d-flex flex-column gap-5">
                      <span className="text-gray-900">Yüklenecek Dosyalar</span>
                      <ul>
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                      <button
                        onClick={handleUploadFiles}
                        type="button"
                        className="btn btn-lg btn-light-primary me-3">
                        <KTIcon iconName="file-up" className="me-3" /> Dosyaları
                        Yükle
                      </button>
                    </div>
                  )}
                  <input {...getInputProps({ multiple: true })} />
                </div>
              )}
            </Dropzone>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <img
              src="media/illustrations/sigma-1/18.png"
              alt="empty"
              width={250}
              height={250}
            />
            <span className="text-gray-500">Dosya Bulunamadı</span>
          </div>
        )}
      </Content>
    </KTCard>
  );
};

export default LatestFileComponent;
