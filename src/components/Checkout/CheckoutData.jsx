import React, { useState } from "react";
import FormCheckout from "./FormCheckout";

const CheckoutData = () => {
  const [reciverForm, setReciverForm] = useState({
    zip_code: "",
    street_name: "",
    street_number: "",
    floor: "",
    apartment: "",
    city_name: "",
    state_name: "",
    country_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReciverForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer algo con los datos del formulario, como enviarlos a través de una solicitud HTTP
    console.log(reciverForm);
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            Completa los datos para finalizar la compra!
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          action=""
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label className="sr-only">Codigo Postal</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese el codigo postal"
                name="zip_code"
                value={reciverForm.zip_code}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Direccion</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese su direccion"
                name="street_name"
                value={reciverForm.street_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Numbero de casa</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese su numero de casa"
                name="street_number"
                value={reciverForm.street_number}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Piso </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese el piso"
                name="floor"
                value={reciverForm.floor}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Departamento</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese el departamento"
                name="apartment"
                value={reciverForm.apartment}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Ciudad</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese su ciuidad"
                name="city_name"
                value={reciverForm.city_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Provincia</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese su provincia"
                name="state_name"
                value={reciverForm.state_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Pais</label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingrese su pais"
                name="country_name"
                value={reciverForm.country_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              <FormCheckout />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutData;
