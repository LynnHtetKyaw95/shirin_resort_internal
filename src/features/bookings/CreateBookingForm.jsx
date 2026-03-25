import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import styled from "styled-components";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { useGuests } from "../guests/useGuests";
import { useGetAllCabins } from "../cabins/useGetAllCabins";
import { differenceInDays } from "date-fns";
import { useCreateBooking } from "./useCreateBooking";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const CreateBookingForm = ({ onCloseModal }) => {
  const { register, handleSubmit, formState, watch, setValue, reset } = useForm({
    defaultValues: {
      extrasPrice: 0,
      observations: "",
    },
  });
  const { errors } = formState;

  const { createCabin } = useCreateBooking();

  const { guests = [], isPending: guestLoading } = useGuests();
  const { cabins = [], isPending: cabinLoading } = useGetAllCabins();

  const guestOptions = [
    { value: "", label: "Select guest" },
    ...guests.map((guest) => ({ value: guest.id, label: guest.fullName })),
  ];

  const selectedCabinId = watch("cabinId");
  const selectedCabin = cabins?.find(
    (c) => Number(c.id) === Number(selectedCabinId),
  );
  const cabinPrice = selectedCabin?.regularPrice || 0;

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const numNights =
    startDate && endDate
      ? differenceInDays(new Date(endDate), new Date(startDate))
      : 0;

  const extrasPrice = watch("extrasPrice") || 0;
  const totalPrice = cabinPrice * numNights + Number(extrasPrice);

  function onSubmit(data) {
    const bookingData = {
      guestId: data.guestId,
      cabinId: data.cabinId,
      startDate: data.startDate,
      endDate: data.endDate,
      numNights: numNights,
      numGuests: data.numGuests,
      cabinPrice: cabinPrice,
      extrasPrice: Number(data.extrasPrice) || 0,
      totalPrice: totalPrice,
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
      observations: data.observations || "",
    };

    createCabin(bookingData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest name" error={errors?.guestId?.message}>
        <Select
          value={watch("guestId") || ""}
          onChange={(e) => setValue("guestId", Number(e.target.value))}
          options={guestOptions}
          disabled={guestLoading}
          {...register("guestId", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin name" error={errors?.cabinId?.message}>
        <Select
          value={watch("cabinId") || ""}
          onChange={(e) => {
            const cabinId = Number(e.target.value);
            const cabin = cabins?.find((c) => Number(c.id) === cabinId);
            setValue("cabinId", cabinId);
            setValue("cabinPrice", cabin?.regularPrice || 0);
          }}
          options={[
            { value: "", label: "Select cabin" },
            ...cabins.map((cabin) => ({ value: cabin.id, label: cabin.name })),
          ]}
          disabled={cabinLoading}
          {...register("cabinId", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          {...register("startDate", {
            required: "This field is required",
            validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const selectedDate = new Date(value);
              return (
                selectedDate >= today || "Start date cannot be in the past"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const startDate = watch("startDate");
              if (!startDate) return true;
              return (
                new Date(value) > new Date(startDate) ||
                "End date must be after start date"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Num Nights">
        <Input type="number" value={numNights} disabled={true} />
      </FormRow>

      <FormRow label="Cabin Price">
        <Input
          type="number"
          value={watch("cabinPrice") || cabinPrice}
          disabled={true}
        />
      </FormRow>

      <FormRow label="Num Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          {...register("numGuests", {
            valueAsNumber: true,
            required: "This field is required",
            min: {
              value: 1,
              message: "At least 1 guest is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          {...register("extrasPrice", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Total Price">
        <Input type="number" value={totalPrice} disabled={true} />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea {...register("observations")} />
      </FormRow>

      <FormRow2>
        <Button
          $variation="secondary"
          $size="medium"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={false} $variation="primary" $size="medium">
          Create new Booking
        </Button>
      </FormRow2>
    </Form>
  );
};

export default CreateBookingForm;
