import * as React from 'react';

import logo from './../assets/images/logo.svg';
import nodeLogo from './../assets/images/node-logo.svg';
import moviedbLogo from './../assets/images/themoviedb-green.svg';
import loopbackLogo from './../assets/images/loopback.svg';

export const About = () => (
    <div className="about">
        <h1>About</h1>
        <div>This is a Simple Project for Movie Reviews and Recommendations
            <p>
                Main purpose: show represent movies and information about them, characters, ratings and release date
            </p>

            <p>Used: technologies: React.js and Node.js it uses Loopback for generting the backend services
                the project uses
                <img src={logo} className="App-logo" alt="React logo" />
                <img src={nodeLogo} className="node-logo" alt="React logo" />
                <img src={loopbackLogo} className="loopback-logo" alt="React logo" />
                <img src={moviedbLogo} className="moviedb-logo-big" alt="logo" />
            </p>
            <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
        </div>
    </div>
);
