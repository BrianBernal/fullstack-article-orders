type TModalButton = {
  buttonText: string;
  handler?: (p?: unknown) => void;
};

type TModal = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
  ok?: TModalButton;
  cancel?: TModalButton;
  hideActions?: boolean;
};

export type { TModal };
