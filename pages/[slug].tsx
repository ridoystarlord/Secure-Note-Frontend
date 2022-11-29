import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Navbar from '../components/Navbar/Navbar';
import { getHiddenNoteByUrl, getNoteByUrl } from '../services/note.service';
import {
  NoteDestroyedResponse,
  NoteHasPasswordResponse,
  NoteResponse,
} from '../types/NoteResponse';

const schema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm Password is required'),
});

export type hiddenNoteType = z.infer<typeof schema>;

const Slug = () => {
  const [noteDetails, setNoteDetails] = React.useState<NoteResponse | null>(
    null,
  );
  const [hasPassword, setHasPassword] =
    React.useState<NoteHasPasswordResponse | null>(null);
  const [doesNoteDestroyed, setDoesNoteDestroyed] =
    React.useState<NoteDestroyedResponse | null>(null);
  const router = useRouter();
  const { slug } = router.query;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<hiddenNoteType>({
    resolver: zodResolver(schema),
  });

  // **  Data Fetching ** //
  const { api, getKey } = getNoteByUrl(slug ? slug.toString() : '');
  const {
    data: toData,
    refetch,
    status,
  } = useQuery(getKey(), api, {
    enabled: Boolean(slug),
    onSuccess(data) {
      if (!data?.hasPassword) {
        if (data?.isDestroyed) {
          setDoesNoteDestroyed(data);
        } else {
          let decrypted = CryptoJS?.AES?.decrypt(
            data?.message,
            data?.frontendSecretKey,
          );
          data.message = decrypted.toString(CryptoJS.enc.Utf8);
          setNoteDetails(data);
        }
      } else {
        setHasPassword(data);
      }
    },
  });

  // **  Data Fetching ** //

  const { api: hiddenNoteAPI, getKey: hiddenNoteKey } = getHiddenNoteByUrl(
    slug ? slug.toString() : '',
  );
  const { mutateAsync: showhiddenNoteMuteAsync } = useMutation(hiddenNoteAPI, {
    onSuccess(data) {
      if (data) {
        let message = data?.message ?? '';
        let frontendSecretKey = data?.frontendSecretKey ?? '';
        let decrypted = CryptoJS?.AES?.decrypt(message, frontendSecretKey);
        data.message = decrypted.toString(CryptoJS.enc.Utf8);
        setNoteDetails(data);
        setHasPassword(null);
      }
    },
  });

  const onSubmit = (data: hiddenNoteType) => {
    toast.promise(
      showhiddenNoteMuteAsync(data),
      {
        loading: 'Checking Credentials',
        success: 'Password Matched',
        error: 'Error credentails',
      },
      {
        id: 'show-note',
      },
    );
  };

  const handleError = (errors: any) => {
    console.log(errors);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-slate-100 h-[93vh]">
        <div className="py-2">
          <div className="bg-white ">
            <div className="md:w-[800px] mx-auto grid grid-cols-1 gap-2 p-3">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {doesNoteDestroyed?.isDestroyed
                    ? 'Note destroyed'
                    : 'Note contents'}
                </h1>
              </div>
              {status === 'loading' ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : hasPassword !== null ? (
                <div>
                  <h3 className="bg-amber-300 p-2 text-center rounded font-bold">
                    {hasPassword?.message}
                  </h3>
                  <form
                    id="hidden-note"
                    onSubmit={handleSubmit(onSubmit, handleError)}
                  >
                    <div className="grid grid-cols-1 gap-2">
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
                            {...register('password')}
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
                            {...register('confirmPassword')}
                            type="password"
                            id="confirm_password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 "
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          form="hidden-note"
                          type="submit"
                          className="focus:outline-none text-white bg-[#960000] hover:bg-[#960000] focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                          Show Note
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : doesNoteDestroyed?.isDestroyed ? (
                <div className="grid grid-cols-1 gap-3">
                  <p className="text-lg">
                    If you havent read this note it means someone else has. If
                    you read it but forgot to write it down, then you need to
                    ask whoever sent it to re-send it.
                  </p>
                </div>
              ) : (
                <section className="grid grid-cols-1 gap-2">
                  <h3 className="bg-amber-300 p-2 text-center rounded font-bold">
                    This note was destroyed. If you need to keep it, copy it
                    before closing this window.
                  </h3>
                  <textarea
                    disabled
                    value={noteDetails?.message}
                    rows={12}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-amber-100 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <div>
                    <CopyToClipboard
                      text={noteDetails?.message ?? ''}
                      onCopy={() => toast.success('Copied')}
                    >
                      <button
                        type="button"
                        className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 "
                      >
                        Copy Text
                      </button>
                    </CopyToClipboard>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slug;
