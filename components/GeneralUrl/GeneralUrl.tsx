import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsQuestionLg } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import * as z from 'zod';

import { API_URL, BASE_URL } from '../../environment/environment';
import { createNewNote, deleteNote } from '../../services/note.service';
import { NoteResponse } from '../../types/NoteResponse';
const schema = z.object({
  message: z.string().min(1, { message: 'Message is Required' }),
  frontendSecretKey: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  name: z.string().optional(),
  email: z.string().nullable().optional(),
  askForConfirmation: z.boolean().optional(),
  destroyTime: z.string().nullable().optional(),
});

export type noteType = z.infer<typeof schema>;

const defaultValue: noteType = {
  message: '',
  frontendSecretKey: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: null,
  askForConfirmation: false,
  destroyTime: '0',
};

type Props = {
  createNoteData: NoteResponse | null;
};

const GeneralUrl = ({ createNoteData }: Props) => {
  const [showSecureNoteDescriptions, setShowSecureNoteDescriptions] =
    useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<noteType>({
    defaultValues: {
      ...defaultValue,
    },
    resolver: zodResolver(schema),
  });

  const { api: deleteNoteApi } = deleteNote();
  const { mutateAsync: deleteRequest } = useMutation(deleteNoteApi, {
    onSuccess: () => {
      window.location.reload();
    },
  });

  const { api, getKey } = createNewNote();
  const { mutateAsync: createNewNoteMuteAsync, status } = useMutation(api, {
    onSuccess(data) {
      reset();
    },
  });

  const onSubmit = (data: noteType) => {
    data.frontendSecretKey = '123456';
    data.destroyTime = null;
    toast.promise(
      createNewNoteMuteAsync(data),
      {
        loading: 'Note Createing',
        success: 'Note Created Successful',
        error: 'Error on note creation',
      },
      {
        id: 'new-note',
      },
    );
  };

  const handleError = (errors: any) => {
    console.log(errors);
  };

  const handleDelete = () => {
    if (createNoteData?.url) {
      toast.promise(
        deleteRequest(createNoteData?.url),
        {
          success: 'Note Deleted Successfully',
          error: 'Error Deleting Note',
          loading: 'Deleting Note',
        },
        {
          id: 'delete-note',
        },
      );
    }
  };

  return (
    <div className="bg-slate-100 h-[93vh]">
      <form id="create-note" onSubmit={handleSubmit(onSubmit, handleError)}>
        <div className="py-2">
          <div className="bg-white shadow">
            <div className="md:w-[800px] mx-auto grid grid-cols-1 gap-2 p-3">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Note link ready</h1>
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
                  Copy the link, paste it into an email or instant message and
                  send it to whom you want to read the note.
                </div>
              ) : null}

              <section className="grid grid-cols-1 gap-2">
                <div>
                  <div className="bg-amber-200  p-2 rounded">
                    <Highlighter
                      highlightClassName="highLighterClassName"
                      searchWords={[`${BASE_URL}/${createNoteData?.url}`]}
                      autoEscape={true}
                      textToHighlight={
                        createNoteData !== null
                          ? `${BASE_URL}/${createNoteData?.url}`
                          : ''
                      }
                    />
                  </div>
                  <h3 className="bg-amber-300 p-2">
                    The note will self-destruct after reading it.
                  </h3>
                </div>
              </section>
              <div className="flex justify-between items-center">
                <CopyToClipboard
                  text={
                    createNoteData !== null
                      ? `${BASE_URL}/${createNoteData?.url}`
                      : ''
                  }
                  onCopy={() => toast.success('Copied')}
                >
                  <button
                    type="button"
                    className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 "
                  >
                    Copy
                  </button>
                </CopyToClipboard>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-amber-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 "
                >
                  Destroy Note Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default GeneralUrl;
