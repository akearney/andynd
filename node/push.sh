npm run build
local_path=build
remote_path=/home/protected/andynd/node
rsync -av --exclude tiles/* build kearneyandy_andynd@ssh.phx.nearlyfreespeech.net:/home/protected/andynd/node

# sftp -v -oIdentityFile=password.txt kearneyandy_andynd@ssh.phx.nearlyfreespeech.net <<EOF
# put -r $local_path $remote_path
# EOF
