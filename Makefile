server:
	sudo rackup config.ru -p 80
icon:
	convert public/images/favicon.png -define icon:auto-resize public/images/favicon.ico

restart:
	sudo launchctl unload /Library/LaunchDaemons/connectouch.plist
	sudo launchctl load /Library/LaunchDaemons/connectouch.plist
	sudo launchctl start /Library/LaunchDaemons/connectouch.plist
