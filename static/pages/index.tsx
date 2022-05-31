import type { NextPage } from 'next'
import { useState } from 'react';
import Router from 'next/router'
import Button from '../components/Button';
import { LogoMark } from '../components/Header/logo';
import { isValid } from '../lib/helpers/nfts';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  const [handle, setHandle] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHandle = e.target.value;
    const valid = isValid(newHandle);
    if (!valid && 0 === handle.length) {
      return;
    }

    if (valid) {
      const newHandle = e.target.value;
      setHandle(newHandle.toLowerCase());
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid(handle)) {
      return;
    }

    Router.push(`/${handle}`);
  }

  return (
    <Layout pageTitle='Home'>
      <section className="z-0 md:max-w-xl mx-auto relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 gap-4 bg-dark-200 rounded-lg shadow-lg place-content-start p-4 lg:p-8 mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Lookup a Handle
            </h2>
            <div className="col-span-6 col-start-4 mb-2">
              <form onSubmit={onSubmit}>
                <div className={`relative`}>
                  <LogoMark className='absolute h-full left-0 top-0 px-6 py-4 opacity-10' />
                  <input
                    onChange={onChange}
                    className="focus:ring-0 focus:ring-opacity-0 border-2 focus:border-white outline-none form-input bg-dark-100 border-dark-300 rounded-lg pr-6 pl-16 py-4 text-xl w-full overflow-hidden"
                    value={handle}
                    placeholder="Search for a handle..."
                  />
                </div>
                <Button disabled={!isValid(handle) || handle.length === 0} className="w-full mt-4">Search!</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home
