const path = require('path')
const Email = require('email-templates')

const {
  mailFromAddress,
  mailFromName,
  mailSMTPHost,
  mailSMTPPort,
  mailSMTPUser,
  mailSMTPPassword,
  frontendUrl
} = require('../../config/vars')

const sendEmail = async data => {
  const email = new Email({
    message: {
      from: `${mailFromName} <${mailFromAddress}>`
    },
    transport: {
      host: mailSMTPHost,
      port: mailSMTPPort,
      secure: false, // upgrade later with TTLS
      auth: {
        user: mailSMTPUser,
        pass: mailSMTPPassword
      }
    },
    send: true,
    preview: false,
    views: {
      options: {
        extension: 'ejs'
      },
      root: path.join(__dirname, '../templates')
    }
  })

  email
    .send({
      template: data.template,
      message: {
        to: data.to,
        subject: data.subject
      },
      locals: {
        ...data.locals,
        footerText1: `You've received this email because you have created an account`,
        footerText2: `If you didn't create an account you can ignore this email.`,
        footerText3: `Contact Support`
      }
    })
    .then(() => console.log(`[${data.template}] Email has been sent!`))
    .catch(error => console.log(error.msg))
}

module.exports = {
  /**
   * @param user
   * @returns {Promise<void>}
   */
  async sendRegistration(user) {
    const template = 'emailVerification'
    const to = `${user.firstName} ${user.lastName} <${user.email}>`
    const subject = `Verify your email`
    const locals = {
      fullName: `${user.firstName} ${user.lastName}`,
      verifyLink: `${frontendUrl}/verify/${user.verification}`,
    }
    await sendEmail({
      template,
      to,
      subject,
      locals
    })
  },
  /**
   * @param user
   * @returns {Promise<void>}
   */
  async sendResetPassword(user) {
    const template = 'resetPassword'
    const to = user.email
    const subject = 'Reset your password'
    const locals = {
      fullName: `${user.firstName} ${user.lastName}`,
      resetLink: `${frontendUrl}/reset/${user.verification}`,
    }
    await sendEmail({
      template,
      to,
      subject,
      locals
    })
  }
}
