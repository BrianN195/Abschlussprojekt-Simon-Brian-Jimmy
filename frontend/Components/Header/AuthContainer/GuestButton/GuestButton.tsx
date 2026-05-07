type GuestButtonProps = {
  onClick?: () => void;
};

function GuestButton({ onClick }: GuestButtonProps) {
  return (
    <button className="guest-button" onClick={onClick}>
      Guest
    </button>
  );
}

export default GuestButton;