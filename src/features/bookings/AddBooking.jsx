import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button $variation="primary" $size="large">
            Add new booking
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddBooking;
