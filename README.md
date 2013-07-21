# chroma-cam

Real-time green-screen effect in the browser, using your webcam.

# demo

[chroma-cam.herokuapp.com](http://chroma-cam.herokuapp.com)

# local setup

Requires Node.js 0.8+

```
npm install
npm start
```

# heroku

The project requires `ffmpeg` to create video thumbnails.
It uses a custom buildpack, so you need to specify it in your ENV config:

```
heroku config:set BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi
```
