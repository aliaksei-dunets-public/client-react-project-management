import React from 'react';
import Link from '@material-ui/core/Link';

const ExternalLinkComponent = ({ url, code }) => {
    if (url && code) {
        url = url.endsWith('/') ? url : `${url}/`;
        return (
            <Link href={url + code} target="_blank">
                {code}
            </Link>
        );
    }
    else {
        return null;
    }
}

export default ExternalLinkComponent;