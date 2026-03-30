// List of known disposable/temporary email domains
const DISPOSABLE_DOMAINS = new Set([
  // Common disposable email services
  'tempmail.com', 'temp-mail.org', 'throwaway.email', 'guerrillamail.com',
  'mailinator.com', '10minutemail.com', 'fakeinbox.com', 'trashmail.com',
  'getnada.com', 'tempinbox.com', 'maildrop.cc', 'sharklasers.com',
  'grr.la', 'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de',
  'spam4.me', 'mailnesia.com', 'yopmail.com', 'cool.fr.nf', 'jetable.org',
  'mytrashmail.com', 'disposablemail.com', 'discard.email', 'emailondeck.com',
  'tempr.email', 'mohmal.com', 'emailfake.com', 'fakemailgenerator.com',
  'tempmailo.com', '24hourmail.com', 'mailcatch.com', 'burnermail.io',
  'mailtemp.net', 'instant-mail.de', 'tempmail.ninja', 'dispostable.com',
  'tempmail.de', 'mailtemp.info', 'throwawaymail.com', 'tempmail.net',
  'temp-mail.io', 'tempmailaddress.com', 'emailtemp.org', 'tmpmail.org',
  'tmpmail.net', 'tmpemail.net', 'tmpbox.net', 'moakt.com', 'tmpeml.com',
  'tempmail.ws', 'disposable-email.com', 'mailtemp.com', 'tempmail.plus',
  'mailinator.net', 'mailinator.org', 'mailinator2.com', 'sogetmail.com',
  'suremail.info', 'tempemail.net', 'temprmail.com', 'trashmail.net',
  'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org', 'wh4f.org',
  '10minutemail.de', '10minutemail.org', '10mail.org', '20minutemail.com',
  '30minutemail.com', '60minutemail.com', '90minutemail.com', 'mailtemp.io',
  'tempmail.dev', 'tempmail.app', 'tempmail.xyz', 'tempmail.site',
  'tempmail.online', 'tempmail.website', 'tempmail.space', 'tempmail.cloud',
  'tempmail.digital', 'tempmail.tech', 'tempmail.services', 'tempmail.solutions',
  'tempmail.tools', 'tempmail.email', 'tempmail.live', 'tempmail.today',
  'tempmail.now', 'tempmail.direct', 'tempmail.express', 'tempmail.fast',
  'tempmail.quick', 'tempmail.instant', 'tempmail.rapid', 'tempmail.swift',
  'tempmail.flash', 'tempmail.bolt', 'tempmail.jet', 'tempmail.zoom',
  'tempmail.dash', 'tempmail.spark', 'tempmail.flare', 'tempmail.blaze',
  'tempmail.fire', 'tempmail.heat', 'tempmail.warm', 'tempmail.hot',
  'tempmail.cool', 'tempmail.chill', 'tempmail.freeze', 'tempmail.ice',
  'tempmail.snow', 'tempmail.frost', 'tempmail.mist', 'tempmail.fog',
  'tempmail.cloud', 'tempmail.storm', 'tempmail.rain', 'tempmail.drip',
  'tempmail.drop', 'tempmail.flow', 'tempmail.stream', 'tempmail.river',
  'tempmail.ocean', 'tempmail.sea', 'tempmail.lake', 'tempmail.pond',
  'tempmail.pool', 'tempmail.well', 'tempmail.spring', 'tempmail.source',
  'tempmail.origin', 'tempmail.start', 'tempmail.begin', 'tempmail.first',
  'tempmail.last', 'tempmail.end', 'tempmail.final', 'tempmail.ultimate',
  'tempmail.supreme', 'tempmail.ultra', 'tempmail.mega', 'tempmail.super',
  'tempmail.hyper', 'tempmail.turbo', 'tempmail.power', 'tempmail.force',
  'tempmail.energy', 'tempmail.volt', 'tempmail.watt', 'tempmail.amp',
  'tempmail.ohm', 'tempmail.flux', 'tempmail.core', 'tempmail.nexus',
  'tempmail.hub', 'tempmail.link', 'tempmail.connect', 'tempmail.join',
  'tempmail.unite', 'tempmail.merge', 'tempmail.combine', 'tempmail.mix',
  'tempmail.blend', 'tempmail.fuse', 'tempmail.weld', 'tempmail.bond',
  'tempmail.tie', 'tempmail.bind', 'tempmail.attach', 'tempmail.fix',
  'tempmail.stick', 'tempmail.glue', 'tempmail.cement', 'tempmail.seal',
  'tempmail.lock', 'tempmail.secure', 'tempmail.safe', 'tempmail.protect',
  'tempmail.guard', 'tempmail.shield', 'tempmail.defend', 'tempmail.block',
  'tempmail.stop', 'tempmail.halt', 'tempmail.pause', 'tempmail.wait',
  'tempmail.hold', 'tempmail.keep', 'tempmail.save', 'tempmail.store',
  'tempmail.cache', 'tempmail.backup', 'tempmail.archive', 'tempmail.vault',
  'tempmail.depot', 'tempmail.warehouse', 'tempmail.storage', 'tempmail.silo',
  'tempmail.bin', 'tempmail.box', 'tempmail.container', 'tempmail.bucket',
  'tempmail.basket', 'tempmail.bag', 'tempmail.sack', 'tempmail.pack',
  'tempmail.bundle', 'tempmail.package', 'tempmail.parcel', 'tempmail.box',
  'mailcatch.com', 'maildrop.cc', 'mailinator.com', 'mailnesia.com',
  'spamgourmet.com', 'spamhereplease.com', 'spamthisplease.com',
  'tempemail.co.za', 'tempemail.com', 'tempemail.net', 'tempinbox.co.uk',
  'tempinbox.com', 'tempmail.co.uk', 'tempmail.com', 'tempmail.de',
  'tempmail.it', 'tempmail.net', 'tempmail.org', 'tempmail.ru',
  'tempmail.us', 'tempmail.ws', 'tempmailer.com', 'tempmailer.de',
  'tempmailaddress.com', 'tempthe.net', 'tempymail.com', 'thanksnospam.info',
  'thankyou2010.com', 'thisisnotmyrealemail.com', 'throwawayemailaddresses.com',
  'tilien.com', 'tittbit.in', 'tmail.ws', 'tmailinator.com', 'toomail.biz',
  'tradermail.info', 'trash-mail.at', 'trash-mail.com', 'trash-mail.de',
  'trash2009.com', 'trashdevil.com', 'trashymail.com', 'tyldd.com',
  'uggsrock.com', 'upliftnow.com', 'uplipht.com', 'venompen.com',
  'veryrealemail.com', 'viditag.com', 'viewcastmedia.com', 'viewcastmedia.net',
  'vinbazar.com', 'viola.gq', 'viralplays.com', 'vmailing.info',
  'vubby.com', 'wasteland.rfc822.org', 'webemail.me', 'webm4il.info',
  'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org', 'wetrainbayarea.com',
  'wfgdfhjdfd.com', 'wh4f.org', 'whatiaas.com', 'whatpaas.com',
  'whatsaas.com', 'whopy.com', 'wilemail.com', 'willhackforfood.biz',
  'wmail.cf', 'writeme.com', 'wronghead.com', 'wuzup.net', 'wuzupmail.net',
  'www.e4ward.com', 'www.gishpuppy.com', 'www.mailinator.com', 'wwwnew.eu',
  'x.ip6.li', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmaily.com',
  'xoxox.cc', 'xspam.jp', 'yapped.net', 'yeah.net', 'yep.it',
  'yogamaven.com', 'yomail.info', 'yopmail.com', 'yopmail.fr', 'yopmail.net',
  'yopmail.org', 'yopmail.pl', 'yopmail.remoteweb.org', 'yopmail.tk',
  'yopmail.us', 'yopmailzone.com', 'yourdomain.com', 'yroid.com',
  'yugasandrika.com', 'yui.it', 'yuoia.com', 'yuurok.com', 'zehnminuten.de',
  'zehnminutenmail.de', 'zetmail.com', 'zippymail.info', 'zoemail.org',
  'zomg.info', 'zxcv.com', 'zybermail.com', 'zyklon.info',
  // Add more as needed
]);

// Common valid email domains for comparison
const COMMON_PROVIDERS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
  'gmx.com', 'live.com', 'msn.com', 'me.com', 'mac.com', 'googlemail.com',
  'pm.me', 'proton.me', 'hey.com', 'fastmail.com', 'tutanota.com',
  'mailbox.org', 'posteo.de', 'runbox.com', 'startmail.com', 'countermail.com',
]);

export interface EmailValidationResult {
  isValid: boolean;
  isDisposable: boolean;
  isCommonProvider: boolean;
  domain: string;
  message?: string;
}

/**
 * Validates an email address and checks if it's from a disposable/temporary email service
 */
export function validateEmail(email: string): EmailValidationResult {
  const trimmedEmail = email.trim().toLowerCase();
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      isDisposable: false,
      isCommonProvider: false,
      domain: '',
      message: 'Invalid email format',
    };
  }

  const domain = trimmedEmail.split('@')[1];

  // Check if it's a disposable email
  const isDisposable = DISPOSABLE_DOMAINS.has(domain);
  
  // Check if it's a common provider
  const isCommonProvider = COMMON_PROVIDERS.has(domain);

  if (isDisposable) {
    return {
      isValid: false,
      isDisposable: true,
      isCommonProvider: false,
      domain,
      message: 'Disposable/temporary email addresses are not allowed. Please use a permanent email address.',
    };
  }

  return {
    isValid: true,
    isDisposable: false,
    isCommonProvider,
    domain,
    message: isCommonProvider ? undefined : 'Using a custom domain',
  };
}

/**
 * Quick check if an email is disposable
 */
export function isDisposableEmail(email: string): boolean {
  const result = validateEmail(email);
  return result.isDisposable;
}

/**
 * Get the domain from an email address
 */
export function getEmailDomain(email: string): string {
  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return '';
  }
  
  return trimmedEmail.split('@')[1];
}
