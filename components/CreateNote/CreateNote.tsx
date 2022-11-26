import React, { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

const CreateNote = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showSecureNoteDescriptions, setShowSecureNoteDescriptions] =
    useState<boolean>(false);
  return (
    <div className="bg-slate-100 h-[93vh]">
      <div className="py-2">
        <div className="bg-white shadow">
          <div className="w-[800px] mx-auto grid grid-cols-1 gap-2 p-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">New note</h1>
              <button
                type="button"
                onClick={() => setShowSecureNoteDescriptions((prev) => !prev)}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 "
              >
                {showSecureNoteDescriptions ? <FiX /> : <BsQuestionLg />}
              </button>
            </div>
            {showSecureNoteDescriptions ? (
              <div className="bg-slate-200 p-1 rounded text-sm">
                With Privnote you can send notes that will self-destruct after
                being read. <br /> 1. Write the note below, encrypt it and get a
                link. <br /> 2. Send the link to whom you want to read the note.{' '}
                <br /> 3. The note will self-destruct after being read by the
                recipient. <br /> <br /> By clicking the options button, you can
                specify a manual password to encrypt the note, set an expiration
                date and be notified when the note is destroyed. <br /> <br />{' '}
                To know more about how Privnote works, check out the about page.
              </div>
            ) : null}
            <textarea
              rows={12}
              className="block p-2.5 w-full text-sm text-gray-900 bg-amber-100 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            {showOptions ? (
              <section className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Note self-destructs
                  </label>
                  <div className="flex items-center gap-5">
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 ">
                      <option selected value="0">
                        Immediately
                      </option>
                      <option value="1">1 hour from now</option>
                      <option value="24">24 hour from now</option>
                      <option value="7">7 day from now</option>
                      <option value="30">30 day from now</option>
                    </select>
                    <div className="flex items-start gap-2">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
                      />
                      <label
                        form="default-checkbox"
                        className="text-sm text-gray-900 "
                      >
                        Do not ask for confirmation before showing and
                        destroying the note.
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Manual password
                  </label>
                  <div className="flex items-center gap-5">
                    <div className="block w-full">
                      <label
                        form="password"
                        className="block mb-1 text-sm text-gray-900 "
                      >
                        Enter a custom password to encrypt the note
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
                      />
                    </div>
                    <div className="block w-full">
                      <label
                        form="confirm_password"
                        className="block mb-1 text-sm text-gray-900 "
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Destruction notification
                  </label>
                  <div className="flex items-center gap-5">
                    <div className="block w-full">
                      <label
                        form="email"
                        className="block mb-1 text-sm text-gray-900 "
                      >
                        E-mail to notify when note is destroyed
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
                      />
                    </div>
                    <div className="block w-full">
                      <label
                        form="name"
                        className="block mb-1 text-sm text-gray-900 "
                      >
                        Reference name for the note (optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
                      />
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="focus:outline-none text-white bg-[#960000] hover:bg-[#960000] focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Create Note
              </button>
              <button
                type="button"
                onClick={() => setShowOptions((prev) => !prev)}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 "
              >
                {showOptions ? 'Hide Options' : 'Show Options'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
