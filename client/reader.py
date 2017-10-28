# -*- coding: utf-8 -*-

import nfc
import binascii
import requests
from datetime import datetime
from uuid import getnode as get_mac

readerId = "%012x" % get_mac() # リーダに接続されたマシンのMACアドレス (48ビット整数)

def startup(targets):
    print 'waiting for NFC tag ...'
    return targets

def connected(tag):
    id = binascii.hexlify(tag.identifier)
    date = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    print("|%s| readerId: %s nfcId: %s" % (date, readerId, id))

    request = "http://connectouch.org/addlink/%s/%s" % (readerId, id)
    try:
        res = requests.get(request)
        print(res.text)
    except Exception, e:
        print(e)

    return id
    
def released(tag):
    return('released')
    
clf = nfc.ContactlessFrontend('usb')
if clf:
    while clf.connect(rdwr={
            'on-startup': startup,
            'on-connect': connected,
            'on-release': released,
    }):
        pass
    
        
