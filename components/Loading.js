import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex items-center w-full mt-56 justify-center'>
            <ThreeDots color='#00BFFF' height={50} width={40} />
        </div>
    )
}

export default Loading;