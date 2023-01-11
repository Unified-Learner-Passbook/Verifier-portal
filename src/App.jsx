import { useEffect } from 'react';
// import ReactDOMServer from 'react-dom/server';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import './App.css';
import JobImg from './job.png';
import Certificate from './templates/certificate';

function App() {
  const MEDIATOR =
    'https://authn.io/mediator' +
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

    const result = await navigator.credentials.get(credentialInterfaceQuery);

    if (!result)
      document.getElementById('getResults').innerText =
        'Requesting credential...';

    document.getElementById('resultsPanel').classList.remove('hide');
    // document.getElementById('getResults').innerHTML =  ReactDOMServer.renderToString(<Certificate />);

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
    <div>
      <div style={{ position: 'relative' }}>
        <img src={JobImg} alt='' style={{ height: '650px', width: '100vw' }} />
        <div
          className='font-bold text-center text-5xl'
          style={{
            position: 'absolute',
            top: '42%',
            width: '100%',
            textAlign: 'center',
            fontSize: '70px',
            fontWeight: '800',
            color: 'white',
          }}>
          Find your next job
          <p style={{ fontSize: '20px', marginTop: '40px', fontWeight: '400' }}>
            More than 20,000 jobs are listed here. Apply to it by uploading your
            credentials
          </p>
        </div>
      </div>
      {/* <!-- Container --> */}
      <div className='container mt-32 mx-auto p-4 md:p-0'>
        {/* <!-- Card wrapper --> */}
        <div className='shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto'>
          {/* <!-- Card image --> */}
          <div
            className='bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative'
            style={{
              backgroundImage:
                "url('https://images7.alphacoders.com/347/347549.jpg')",
            }}>
            <div className='absolute text-xl'>
              <i className='fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer'></i>
            </div>
          </div>
          {/* <!-- ./Card image --> */}

          {/* <!-- Card body --> */}
          <div className='bg-white w-full md:w-2/3'>
            {/* <!-- Card body - outer wrapper --> */}
            <div className='h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative'>
              {/* <!-- Card body - inner wrapper --> */}
              <div className='bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center'>
                {/* <!-- Card title and subtitle --> */}
                <div className='w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left'>
                  <h3 className='font-bold'>Teacher</h3>
                  <p className='mb-0 mt-3 text-grey-dark text-sm italic'>
                    Government School
                  </p>
                  <hr className='w-1/4 md:ml-0 mt-4 border lg:hidden' />
                </div>
                <div className='w-full lg:w-3/5 lg:px-3'>
                  <p className='text-md mt-4 lg:mt-0 text-justify md:text-left text-sm'>
                    We are looking for a committed Teacher to complement our
                    qualified workforce of educators. You will be responsible
                    for preparing and implementing a full educational teaching
                    plan according to the school’s requirements. It will be
                    fundamental to provide knowledge and instruction to students
                    while also helping them develop their personalities and
                    skills. The ideal candidate will be passionate for the job
                    with an ability to reach out to students and create a
                    relationship of mutual trust. They will know how to organize
                    a class and make learning an easy and meaningful process.
                  </p>
                </div>
                <div className='w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left'>
                  <button
                    className='bg-blue-500 hover:bg-grey-darker hover:bg-blue-900 border border-solid border-grey w-1/3 lg:w-full py-2 text-white hover:border hover:border-blue-500'
                    id='requestButton'>
                    Get from Wallet
                  </button>
                  <button className='bg-green-500 hover:bg-grey-darker hover:bg-green-900 border border-solid border-grey w-1/3 lg:w-full py-2 text-white hover:border hover:border-blue-500 mt-3'>
                    Scan QR
                  </button>
                </div>
                {/* <!-- ./Call to action button --> */}
              </div>
              {/* <!-- ./Card body - inner wrapper --> */}
            </div>
            {/* <!-- ./Card body - outer wrapper --> */}
          </div>
          {/* <!-- ./Card body --> */}
        </div>
        {/* <!-- ./Card wrapper --> */}
      </div>
      <div className='container mt-32 mx-auto p-4 md:p-0 mb-32'>
        {/* <!-- Card wrapper --> */}
        <div className='shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto'>
          {/* <!-- Card image --> */}
          <div
            className='bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative'
            style={{
              backgroundImage:
                "url('https://images7.alphacoders.com/347/347550.jpg')",
            }}>
            <div className='absolute text-xl'>
              <i className='fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer'></i>
            </div>
          </div>
          {/* <!-- ./Card image --> */}

          {/* <!-- Card body --> */}
          <div className='bg-white w-full md:w-2/3'>
            {/* <!-- Card body - outer wrapper --> */}
            <div className='h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative'>
              {/* <!-- Card body - inner wrapper --> */}
              <div className='bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center'>
                {/* <!-- Card title and subtitle --> */}
                <div className='w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left'>
                  <h3 className='font-bold'>Engineer</h3>
                  <p className='mb-0 mt-3 text-grey-dark text-sm italic'>
                    Samagra
                  </p>
                  <hr className='w-1/4 md:ml-0 mt-4 border lg:hidden' />
                </div>
                <div className='w-full lg:w-3/5 lg:px-3'>
                  <p className='text-md mt-4 lg:mt-0 text-justify md:text-left text-sm'>
                    We are looking for an innovative, dedicated engineer who has
                    a broad and general fascination with the engineering
                    sciences and who follows international engineering trends
                    and technologies. The engineer’s responsibilities include
                    defining problems, researching, interpreting, and applying
                    information, developing solutions, and making decisions.
                    <br />
                    To be successful as an engineer, you should have a firm
                    understanding of math and science, a deep social, economic,
                    and cultural awareness, and an enthusiastic fondness for
                    teamwork. Ideal candidates will display an ability to
                    comprehend complex systems, identify the sources of any
                    problems that arise, and decide on which actions to take to
                    fix them.
                  </p>
                </div>
                <div className='w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left'>
                  <button
                    className='bg-blue-500 hover:bg-grey-darker hover:bg-blue-900 border border-solid border-grey w-1/3 lg:w-full py-2 text-white hover:border hover:border-blue-500'
                    id='requestButton'>
                    Get from Wallet
                  </button>
                  <button className='bg-green-500 hover:bg-grey-darker hover:bg-green-900 border border-solid border-grey w-1/3 lg:w-full py-2 text-white hover:border hover:border-blue-500 mt-3'>
                    Scan QR
                  </button>
                </div>
                {/* <!-- ./Call to action button --> */}
              </div>
              {/* <!-- ./Card body - inner wrapper --> */}
            </div>
            {/* <!-- ./Card body - outer wrapper --> */}
          </div>
          {/* <!-- ./Card body --> */}
        </div>
        {/* <!-- ./Card wrapper --> */}
      </div>
      {/* <!-- ./Container --> */}

      <div
        id='defaultModal'
        tabindex='-1'
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
        <div className='relative w-full h-full max-w-2xl md:h-auto'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            {/* <!-- Modal header --> */}
            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Terms of Service
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='defaultModal'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className='outer-border'>
              <div className='inner-dotted-border'>
                <span className='certification'>Certificate of Completion</span>
                <br />
                <br />
                <span className='certify'>
                  <i>This is to certify that</i>
                </span>
                <br />
                <br />
                <span className='name'>
                  <b>Daniel Vitorrie</b>
                </span>
                <br />
                <br />
                <span className='certify'>
                  <i>has successfully completed the certification</i>
                </span>{' '}
                <br />
                <br />
                <span className='fs-30'>Java Developer</span> <br />
                <br />
                <span className='fs-20'>
                  with score of <b>A+</b>
                </span>{' '}
                <br />
                <br />
                <span className='certify'>
                  <i>dated</i>
                </span>
                <br />
                <span className='fs-30' style={{ marginTop: '10px' }}>
                  23 March,2019
                </span>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                data-modal-toggle='defaultModal'
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                I accept
              </button>
              <button
                data-modal-toggle='defaultModal'
                type='button'
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container"> */}
      <div className='card-panel'>
        <div className='card-panel hide' id='resultsPanel'>
          <Certificate />
          {/* <div id="getResults" style={{width: "100vw"}}>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
