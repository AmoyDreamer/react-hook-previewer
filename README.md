# react-hook-previewer
An image preview component based on [React Hook](https://reactjs.org/docs/hooks-intro.html).

## Install
### Using npm
```bash
npm install react-hook-previewer --save-dev
```

## Usage
### ESM usage
```
import usePreviewer from 'react-hook-previewer'

const [previewer, openPreviewer] = usePreviewer()
return (
    <div>
        <img src={url} onClick={() => openPreviewer(url)}/>
        {previewer}
    </div>
)
```

## Description

previewer => {React DOM Element} image previewer component.

openPreviewer(url)
- url => {String} image url. If you want to open the previewer, you must pass a valid url.(required)

## License
react-hook-previewer is [MIT licensed](https://github.com/AmoyDreamer/react-hook-previewer/blob/master/LICENSE).
