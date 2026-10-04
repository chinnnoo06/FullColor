"use client";

import { useLockBodyScroll } from "@/hooks/ui/useLockBodyScroll";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/buttons/Button";

export type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  context: string;
  loading?: boolean;
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, context, loading = false }: TConfirmationModalProps) => {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-5 backdrop-blur-sm bg-black/5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="max-w-xl w-full bg-thrird rounded-lg shadow-lg p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col text-center gap-5">
          <h3 id="confirmation-modal-title" className="font-barlow text-primary text-2xl lg:text-3xl font-bold uppercase">
            {title}
          </h3>

          <p className="text-fourth/75 text-sm lg:text-base">{context}</p>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Button
              variant="secondary"
              type="button"
              width="full"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              width="full"
              loading={loading}
              loadingText="Eliminando..."
              onClick={onConfirm}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
