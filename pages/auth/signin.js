import { getProviders, signIn as signInto } from 'next-auth/react';
import Header from '../../components/Header';


const signIn = ({ providers }) => {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-cente mt-20 text-center'>
                <img className='w-80' src='https://links.papareact.com/ocw' alt='Instagram' />
                <p className='font-xs italic'>This app is made with next.js and backend firebase by SENPAI</p>
                <div className='mt-40'>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-4 bg-blue-500 text-white rounded-lg' onClick={() => signInto(provider.id, { callbackUrl: '/' })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: { providers },
    };
}

export default signIn;