'use server';

import mailchimp from '@mailchimp/mailchimp_marketing';

// Add this interface for Mailchimp error type
interface MailchimpError {
  response: {
    body: {
      title: string;
      status: number;
      detail: string;
    };
  };
}

// Type for the response
interface SubscriptionResponse {
  successMessage?: string;
  errorMessage?: string;
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY as string,
  server: process.env.MAILCHIMP_SERVER_PREFIX as string,
});

export const addSubscriber = async (
  formData: FormData
): Promise<SubscriptionResponse> => {
  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: 'subscribed' as const,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );
    return {
      successMessage: `Success! ${email} was successfully subscribed to our newsletter!`,
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError.response);

    if (mailchimpError.response?.body?.title === 'Member Exists') {
      return {
        errorMessage: `Oops! ${email} is already subscribed to our newsletter!`,
      };
    }
    return {
      errorMessage: `Oops! There was a problem subscribing ${email} to our newsletter!`,
    };
  }
};
