import { useEffect } from 'react';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import './App.css';

function App() {
  const MEDIATOR = 'https://authn.io/mediator' +
  '?origin=' +
  encodeURIComponent(window.location.origin);
  
  async function onClickRequest() {
    //Create Verifiable Presentation Request
    const testVpr = {
      query: [
        {
          type: 'QueryByExample',
          credentialQuery: {
            reason:
              'Please present your University Degree to continue the teacher application process.',
            example: {
              '@context': [
                'https://w3id.org/credentials/v1',
                'https://www.w3.org/2018/credentials/examples/v1',
              ],
              type: ['UniversityDegreeCredential'],
              credentialSubject: {
                id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
              },
            },
          },
        },
      ],
    };

    //Create Credential Interface Query
    const credentialInterfaceQuery = {
      web: {
        VerifiablePresentation: testVpr,
      },
      recommendedHandlerOrigins: ['https://wallet.example.chapi.io/'],
    };

    console.log('Requesting credential...');
    document.getElementById('getResults').innerText =
      'Requesting credential...';

    const result = await navigator.credentials.get(credentialInterfaceQuery);

    document.getElementById('resultsPanel').classList.remove('hide');
    document.getElementById('getResults').innerText = JSON.stringify(
      result,
      null,
      2
    );

    console.log('Result of get() request:', JSON.stringify(result, null, 2));
  }
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR)
      .then(console.log('Polyfill loaded.'))
      .catch((e) => console.error('Error loading polyfill:', e));

    ready(() => {
      document
        .getElementById('requestButton')
        .addEventListener('click', onClickRequest);
      console.log('Document ready.');
    });
  });
  return (
    <div class='container'>
      <div class='card-panel'>
        <h5>Demo Verifier</h5>
        <p>
          If you have not yet picked a wallet and registered it with your
          browser, try out the
          <a href='https://wallet.example.chapi.io/'>Demo Wallet</a>.
        </p>

        <p>
          This is a minimal credential Verifier application that demonstrates
          how an app would ask the user for a credential (using CHAPI's{' '}
          <code>get()</code> under the hood).
        </p>

        <p>
          When you click the Request button, a Verifiable Credential will be
          requested from your digital wallet.
        </p>

        <button class='waves-effect waves-light btn' id='requestButton'>
          Present a Credential
        </button>
      </div>

      <div class='card-panel hide' id='resultsPanel'>
        <h6>Result of get() operation:</h6>

        <pre>
          <code id='getResults'></code>
        </pre>
      </div>
    </div>
  );
}

export default App;
