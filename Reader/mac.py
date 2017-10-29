# -*- coding: utf-8 -*-
#
# MACアドレスを得る (Python)
#

from uuid import getnode as get_mac

# import uuid
# print "%012x" % uuid.getnode()

print "%012x" % get_mac() # => "a45e60e40c05", etc.

# print hex(get_mac())

# mac = get_mac()
# print(mac)
# print(hex(mac))

# macString = ':'.join(("%012x" % mac)[i:i+2] for i in range(0, 12, 2))
# print('[' + macString + ']')

    
        
