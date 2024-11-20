export const pretifiedNumberOnchange = (props) => {
  const { formik, event, formField } = props;
  const regex = /^[0-9]*$/;
  if (
    event.target.value === "" ||
    regex.test(event.target.value?.replaceAll(",", ""))
  ) {
    formik.setFieldValue(
      formField,
      Number(event.target.value?.replaceAll(",", ""))
    );
  }
};
