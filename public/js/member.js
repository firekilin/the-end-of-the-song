'use strict';

var member = this.member ? () => {throw new Error ();} : {};

$ (() => {
  member.loading = () => {
    $.post ('/api/memberList', { MWId: $ ('#MWId').val () }, (data, status) => {
      $ ('#indexList')[0].innerHTML = '';
      for (let i = 0;i < data.length;i ++){
        $ ('#indexList')[0].innerHTML += `<tr>
        <td>${data[i].memberName}</td>
        <td  ${data[i].memberStatus == '1' ? 'style="color:red"' : ''}>${data[i].memberStatus == '0' ? '是' : '否'}
        <button onclick='member.change(${data[i].memberId})'>切換</button>
        <button onclick='member.delplayer(${data[i].memberId})'>清除玩家所有報名</button>
        <button onclick='member.deleteplayer(${data[i].memberId})'>刪除玩家</btton>
        </td>
        </tr>`;
      }
    });
  };

  member.change = (memberId) => {
    $.post ('/api/memberStatus', { memberId: memberId }, (data, status) => {
      alert (data);
      member.loading ();
    });
  };

  //清除玩家報名
  member.delplayer = (memberId) => {
    $.post ('/api/memberDel', { memberId: memberId }, (data, status) => {
      alert (data);
      member.loading ();
    });
  };
  //清除玩家報名
  member.deleteplayer = (memberId) => {
    $.post ('/api/memberDelete', { memberId: memberId }, (data, status) => {
      alert (data);
      member.loading ();
    });
  };

  //取得密碼
  member.getPassword = () => {
    $.post ('/api/getMWPassword', { MW: $ ('#MWId').val () }, (data, status) => {
      $ ('#MWpassword').val (data.password);
    });
  };
  
  //修改密碼
  member.setPassword = () => {
    $.post ('/api/setMWPassword', { MWPassword: $ ('#MWpassword').val (), MW: $ ('#MWId').val () }, (data, status) => {
      alert (data);
      member.getPassword ();
    });
  };
  member.addMember = () => {
    $.post ('./api/addMember', { memberName: $ ('#memberName').val (), MW: $ ('#MWId').val () }, (data, status) => {
      alert (data);
      member.loading ();
    });
  };

  member.getPassword ();
  member.loading ();
  
});



