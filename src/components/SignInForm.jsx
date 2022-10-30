import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "./signInForm.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import illustration from "../assets/keep-in-touch.jpg";
import { useCurrency } from "../context/CurrencyContent";

export const SignInForm = () => {
  const { dispatch } = useCurrency();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      return errors;
    },
    onSubmit: (data) => {
      dispatch({ type: "FORMDATA_UPDATE", payload: data });
      dispatch({ type: "SUBMIT", payload: true });
      dispatch({ type: "SECONDS_RESET", payload: true });
      dispatch({ type: "MINUTES_RESET", payload: true });

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="contact-container">
      <div className="form-container">
        <div className="left-graphic">
          <img src={illustration} alt="" />
        </div>
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <h4 className="form-heading">Lets keep in touch!</h4>
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("name"),
                  })}
                />
                <label
                  htmlFor="name"
                  className={classNames({
                    "p-error": isFormFieldValid("name"),
                  })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email"),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email"),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};
