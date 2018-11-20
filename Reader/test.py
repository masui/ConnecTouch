# -*- coding: utf-8 -*-
#
# リーダとカードのIDを表示
#

import nfc
import binascii
from datetime import datetime
from uuid import getnode as get_mac
import commands

readerId = commands.getoutput("ip a show wlan0 | grep 'inet ' | cut -f6 -d ' '") # リーダに接続されたマシンのIPアドレス

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
