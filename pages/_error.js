// Next.js default error page for fallback
function Error({ statusCode }) {
  return (
    <p style={{textAlign:'center',marginTop:'8rem',fontSize:'1.3rem',color:'#5F805F'}}>
      {statusCode
        ? `Ha ocurrido un error ${statusCode} en la web.`
        : 'Ha ocurrido un error en la web.'}
      <br />
      Por favor, recarga la página o vuelve más tarde.
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
