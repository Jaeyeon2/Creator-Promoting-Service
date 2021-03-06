/* 
 * 홍보서비스 등록 모듈
 *
 * @data 2019-05-23
 * @author 이재연
 */

var addChannel = function(req, res) {
    console.log('/process/thumbnail 호출됨.');
    
    try {
        var paramName = req.body.name;
        var paramContent = req.body.content;
        var paramPlatform = req.body.platform;
        var paramAddress = req.body.address;
        var paramIntroduction = req.body.introduction; 
        
        console.log('채널 이름 : ' + paramName);
        console.log('채널 주소 : ' + paramAddress);
        console.log('플랫폼 : ' + paramPlatform);
        console.log('태표 콘텐츠 : ' + paramContent);
        console.log('채널 소개 : ' + paramIntroduction);
        
        console.dir('#===== 업로드된 파일 정보 =====#');
        console.dir(req.files[0]);
        console.dir('#===========================#');
        
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;
        
        if(Array.isArray(files)) { // 배열에 들어가 있는 경우(설정에서 1개의 파일도 배열에 넣게했음)
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);
            
            for(var index = 0; index < files.length; index++) {
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }
            
            console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' +size);
        
        } else { // 배열에 들어가 있지 않은 경우(현재 설정에서는 해당없음)
            console.log('업로드된 파일이 배열에 들어가 있지 않습니다.');
        }
        
        // 데이터베이스 객체 참조
        var database = req.app.get('database');
        
        // 데이터베이스의 pool 객체가 있는 경우
        if(database.pool) {
            
            // channel의 insertChannel 함수 호출하여 메모 추가
            var data = {
                name:paramName,
                content:paramContent,
                platform:paramPlatform,
                address:paramAddress,
                introduction:paramIntroduction
            };
            
            console.dir(database.channel);
            
            database.channel.insertChannel(database.pool, data, function(err, addedChannel) {
                // 에러 발생 시 - 클라이언트로 에러 전송
                if(err){
                console.error('채널 등록 중 에러 발생 : ' + err.stack);
              
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>채널 등록 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
              
                return;
            }
            
         // 결과 객체 있으면 성공 응답 전송
         if(addedChannel) {
             console.dir(addedChannel);
             
             console.log('inserted ' + addedChannel.affectedRows + ' rows');
             
             var insertId = addedChannel.insertId;
             console.log('추가한 레코드의 아이디 : ' + insertId);
             
             res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
             
             res.write('<div><p>채널이 등록되었습니다.</p></div>');
             res.write('<img src = "/thumbnail/' + filename + '" width = "200px">');
             res.write('<div><input type = "button" value = "다시 작성" onclick = "javascript:history.back()"></div>');
             res.end();
         } else {
             res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
             res.write('<h2>채널 등록 실패</h2>');
             res.end();
         }
    });

   }
 
} catch(err) {
    console.dir(err.stack);
    
    res.writeHead('400', {'Content-Type':'test/html;charset=utf8'});
    res.write('<div><p>채널 등록시 에러 발생</p></div>');
    res.end();
}
    
};



module.exports.addChannel = addChannel;










