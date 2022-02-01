/* eslint-disable react/no-children-prop */
import dynamic from 'next/dynamic'
import Link from 'next/link';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { ClipBoard } from '../../icons';
const ReactMarkdown= dynamic(() => import('react-markdown'),{ ssr: false })
const remarkGfm = dynamic(() => import('remark-gfm'),{ssr: false})
const remarhtml = dynamic(() => import('remark-html'),{ssr: false})
//import rehypeKatex from 'rehype-katex'
const PostItem = ({item}) => {
  const myUrl = `http://www.queperlita.com/perlitas/${item.id}` 
  return (
    <div 
    className="m-2 text-sm font-medium bg-secondary rounded-sm drop-shadow-sm text-secondary">
      <div className='flex flex-col sm:justify-between sm:flex-row sm:items-center'>
        <div className="text-lg py-2 px-4">
          <p>{item.name}, {item.age} años</p>
        </div>
        <div className="text-xs py-2 px-4">
          <p>Publicado por
            {' '}
            {item.username}
            <Link href={'#'}>
              <a className='text-green' >
                <strong>{item.publisher.username}</strong>
              </a>
            </Link>
            {', '}
            el {
              new Date(item.createdAt).toLocaleDateString('es-ES',
              {
                weekday: 'long', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
              })
            }
          </p>
        </div>
      </div>
      <div className='h-1 mx-4 my-2 bg-grey' />
       <div className='prose prose-sm text-base font-medium px-4 py-2'>
          <div className='' dangerouslySetInnerHTML={{__html: item.content}} />
      </div>
      <div className='bg-green px-4 pb-2 pt-4 align-middle '>
        {/* install React-share */}
        <ShareButtons
        url={myUrl}
        title={`!QuePerlita.com han soltado!`}
        hashtags={['#queperlita']}
        />
      </div>
    </div>
  )
}
export default PostItem;


const ShareButtons = ({url, title, hashtags}) => {

  return (
    <div className='flex text-center align-middle'>
        <CopyToClipboard
          text={url}
        >
          <div className='m-1 w-8 h-8 flex items-center justify-center rounded-full bg-secondary-2 ease-in duration-300  hover:scale-105'>
            <ClipBoard className=" w-4 h-4 text-secondary"/>
          </div>
        </CopyToClipboard>
        <EmailShareButton 
          url={url}
          subject={title}
          body={title}
          className='m-1 ease-in duration-300  hover:scale-105'>
          <EmailIcon size={32} round={true}/>
        </EmailShareButton>
        <WhatsappShareButton 
          url={url}
          title={title}
          className='m-1  ease-in duration-300  hover:scale-105'>
          <WhatsappIcon size={32} round={true}/>
        </WhatsappShareButton>
        <FacebookShareButton 
          url={url}
          quote={title}
          hashtag={hashtags != null ? hashtags[0] : ''}
          className='m-1 ease-in duration-300  hover:scale-105'>
          <FacebookIcon size={32}  round={true}/>
        </FacebookShareButton>
        <TwitterShareButton
          title={'QuePerlita.com'}
          url='http://www.queperlita.com/'
          hashtags={hashtags ? hashtags : []}
          className='m-1  ease-in duration-300  hover:scale-105'>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
    </div>
  )
}