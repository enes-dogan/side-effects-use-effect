export type AvaiablePlaces = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat?: number;
  lon?: number;
}[];

export type pickedPlacesType = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
};

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export interface PlacesProps {
  title: string;
  places: pickedPlacesType[];
  fallbackText?: string;
  onSelectPlace: (id: string) => void;
}

export interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}
