import Swal from "sweetalert2";
const swalWithBootstrapButtons = Swal.mixin({
  buttonsStyling: true,
});

export interface SwalOptions {
  title?: string;
  text?: string;
  footer?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  timer?: number;
  timerProgressBar?: boolean;
  reverseButtons?: boolean;
  redirectUrl?: string;
  onClose?: () => void;
}

export function showSwal(options: SwalOptions) {
  return swalWithBootstrapButtons.fire({
    title: options.title || "",
    text: options.text || "",
    footer: options.footer || "",
    icon: options.icon || "info",
    position: options.position || "center",
    showConfirmButton: options.showConfirmButton ?? true,
    showCancelButton: options.showCancelButton ?? false,
    confirmButtonText: options.confirmButtonText || "OK",
    cancelButtonText: options.cancelButtonText || "Cancel",
    confirmButtonColor: options.confirmButtonColor,
    cancelButtonColor: options.cancelButtonColor,
    timer: options.timer,
    timerProgressBar: options.timerProgressBar ?? false,

    reverseButtons: options.reverseButtons ?? false,
    didClose: () => {
      if (options.redirectUrl) {
        window.location.href = options.redirectUrl;
      }
      if (options.onClose) {
        options.onClose();
      }
    },
  });
}
