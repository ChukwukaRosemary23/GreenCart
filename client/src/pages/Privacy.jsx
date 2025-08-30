import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it.
      </p>

      <ul className="list-disc list-inside text-left max-w-2xl mx-auto mt-4 space-y-2">
        <li>🔒 Data is securely stored and never shared without consent.</li>
        <li>📧 Emails may be used for updates but can be unsubscribed anytime.</li>
        <li>🍪 Cookies are used to enhance your shopping experience.</li>
        <li>🛡️ Payment information is handled securely during transactions.</li>
        <li>📄 You can request access, updates, or deletion of your information at any time.</li>
      </ul>
    </div>
  )
}

export default Privacy;
