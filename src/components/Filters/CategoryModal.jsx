import { useState, Fragment, useContext } from "react";
import "firebase/auth";
import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../../context/CartContext";
const CategoryModal = ({ categFunc2 }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    categFunc2(e.target.value);
    setOpen(false);
  };

  return (
    <div>
      <div>
        <button
          className="bg-transparent  border-none focus:outline-none -mt-3 -ml-1 "
          onClick={(e) => setOpen(true)}
        >
          <p className="hover:text-gray-500/75">Categoria</p>
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <UserCircleIcon
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg text-white mb-4 font-medium leading-6 "
                      >
                        Filtrar por categoria
                      </Dialog.Title>

                      <ul>
                        <li className="">
                          <select
                            className=" rounded-lg border-gray-200 p-2 bg-gray-700 pe-12 text-sm shadow-sm text-white"
                            placeholder="Seleccione una categoria"
                            name="categoria"
                            required
                            value={"default"}
                            onChange={handleChange}
                          >
                            <option value={"default"} disabled>
                              Elija una opcion
                            </option>
                            <option value="todos">Todos</option>
                            <option value="remeras">Remeras</option>
                            <option value="buzos">Buzos</option>
                            <option value="pantalones">Pantalones</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border m-1 border-transparent bg-indigo-600 px-4 py-2 text-base font-medium  shadow-sm hover:bg-indigo-500 focus:outline-none sm:text-sm"
                      onClick={(e) => setOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CategoryModal;
