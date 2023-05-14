type TModalButton = {
  buttonText?: string;
  handler: (p?: unknown) => void;
};

type TModal = {
  title: string;
  isOpen: boolean;
  ok?: TModalButton;
  cancel: TModalButton;
  hideActions?: boolean;
  children: React.ReactElement;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { TModal };
