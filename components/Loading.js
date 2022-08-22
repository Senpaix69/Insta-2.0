import { Rings } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex items-center w-full h-screen justify-center'>
            <Rings type='puff' color='#00BFFF' height={550} width={100} />
        </div>
    )
}

export default Loading;