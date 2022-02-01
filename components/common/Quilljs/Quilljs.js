import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Quilljs = ({content, getContent}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'strike', 'blockquote'],
      [
        {list: 'bullet'},
      ],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }

  const _onChange = (content,_delta, _source, editor) => {

    if (editor.getLength() < 200 ){
      typeof(getContent) !== 'undefined' ? getContent(content.toString(), editor.getText()) : ''
    }
    
  }

  return <div className='m-2 rounded-sm'>
    <QuillNoSSRWrapper 
    className='bg-secondary text-secondary rounded-sm'
    modules={modules}
    placeholder='Escribe aqui tu perlita.'
    value={content}
    onChange={_onChange}
      
    />
  </div>
}

export default Quilljs;