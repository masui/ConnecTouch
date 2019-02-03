# -*- coding: utf-8 -*-
#
# NFCを認識したら登録画面を開く
#
# brew install libusb
# sudo pip install nfcpy
# sudo pip install requests
#

import nfc
import binascii
import requests
import os
import commands

def startup(targets):
    print 'waiting for NFC tag ...'
    return targets

def connected(tag):
    print('connected')
    nfcId = binascii.hexlify(tag.identifier)
    print(nfcId)
    
    commands.getoutput("open http://192.168.0.200/register?id={0}".format(nfcId))

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
