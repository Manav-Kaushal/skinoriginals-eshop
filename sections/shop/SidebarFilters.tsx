import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { classNames } from "@utils/helpers";
import { filters } from "@utils/Mocks/shopSidebar";
import { Checkbox } from "antd";
import { Fragment, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlinePlusSm,
  HiOutlineX,
} from "react-icons/hi";

const SidebarFilters = ({ handleFilters }: { handleFilters?: any }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  function handleChange(value: any) {
    const currentIndex = checked.indexOf(value);
    const tempChecked = [...checked];
    if (currentIndex === -1) {
      tempChecked.push(value);
    } else {
      tempChecked.splice(currentIndex, 1);
    }
    setChecked(tempChecked);
    handleFilters(tempChecked);
  }
  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 pt-4 pb-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 h-7 flex items-center">
                                <HiOutlineChevronDown
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="pt-4 pb-2 px-4">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-hover"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <aside>
        <h2 className="sr-only">Filters</h2>

        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium text-white bg-gray-700">
            Filters
          </span>
          <HiOutlinePlusSm
            className="flex-shrink-0 ml-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
        </button>

        <div className="hidden lg:block sticky top-20">
          <form className="divide-y divide-gray-200 space-y-8 border h-full p-4">
            {filters.map((section, sectionIdx) => (
              <div
                key={section.name}
                className={sectionIdx === 0 ? null : "pt-8"}
              >
                <fieldset>
                  <legend className="block text-sm font-bold text-gray-900">
                    {section.name}
                  </legend>
                  <div className="pt-3 space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value}>
                        <Checkbox
                          id={`${section.id}-${optionIdx}`}
                          name={`${section.id}`}
                          checked={
                            checked.indexOf(option.value) === -1 ? false : true
                          }
                          onChange={() => handleChange(option.value)}
                          defaultValue={option.value}
                        >
                          {option.label}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}
          </form>
        </div>
      </aside>
    </div>
  );
};

export default SidebarFilters;
