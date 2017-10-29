# -*- coding: utf-8 -*-
#
# リーダとカードのIDを表示
#

import nfc
import binascii
from datetime import datetime
from uuid import getnode as get_mac

readerId = "%012x" % get_mac() # リーダに接続されたマシンのMACアドレス(48ビット整数)のHex値

def startup(targets):
    print 'waiting for NFC tag ...'
    return targets

def connected(tag):
    nfcId = binascii.hexlify(tag.identifier)
    date = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    print("|%s| readerId: %s nfcId: %s" % (date, readerId, nfcId))
    return id
    
def released(tag):
    print 'released'
    
clf = nfc.ContactlessFrontend('usb')
if clf:
    while clf.connect(rdwr={
            'on-startup': startup,
            'on-connect': connected,
            'on-release': released,
    }):
        pass
    
        
