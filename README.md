<h1>Gather Peaches</h1>
<p>
PC용 간단한 복숭아담기 게임입니다.<br>
몇 년 전에 반짝 유행하였던 플래시 게임인 사과게임을 재밌게 플레이하여, 게임 만들기를 기획할 때 줄곧 이 게임을 만들어보고 싶다고 생각하였기 때문에 이를 모방하여 만들었습니다.<br>
화면 위를 드래그하여 만들어지는 사각형 안에 들어온 복숭아에 써있는 숫자들의 합이 정확히 10이 되도록 하면 복숭아를 딸 수 있습니다. 1분 동안 딴 복숭아의 개수로 점수가 계산됩니다.
<br>
<br>
Canvas와 draggable이라는 상태변수를 활용한 마우스 이벤트, 포물선 애니메이션, local Storage를 이용한 최고 점수 저장 등의 기능을 확인할 수 있습니다.
</p>
<a href="https://yejin-han.github.io/peach_game/">Peach Game 바로가기</a>
<br>
<br>
<br>
<h2>🗓️ 제작 기간</h2>
> 2023. 01. 09. ~ 2023. 01. 19.
<h2>📸 완성 화면</h2>
<table align="center">
  <tr>
    <td width="50%"><img alt="main" src="/capture/main.jpg" /></td>
    <td width="50%"><img alt="howtoplay" src="/capture/howto.jpg" /></td>
  </tr>
</table>
<h2>🛠 활용 tool 및 language</h2>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>Javascript</li>
  <li>VS Code</li>
  <li>Photoshop</li>
</ul>
<br>
<h2>📚 화면 구조</h2>
<ol>
  <li>index.html -> 메인화면, 게임방법</li>
  <li>play.html -> 게임화면, 결과</li>
</ol>
<h2>📋 구현 기능</h2>
<h3>play.html</h3>
  <table align="center">
    <tr>
      <td width="50%"><img alt="게임화면" src="/capture/playing.gif" /></td>
      <td width="50%"><img alt="결과화면" src="/capture/result.jpg" /></td>
    </tr>
  </table>
  <ul>
    <li>복숭아들을 정렬한 div가 있고 그 위에 canvas를 겹쳐 놓았습니다.</li>
    <li>복숭아들에는 0~9의 숫자가 매번 랜덤으로 표시됩니다.</li>
    <li>canvas 위를 드래그하면 사각형이 그려집니다. 이 사각형의 좌표를 받아 같은 좌표 안에 위치한 복숭아들의 이미지를 테두리 있는 이미지로 바꿔 체크하고, 드래그를 놓았을 때 안의 복숭아의 숫자의 합이 정확히 10이 된다면 복숭아들이 떨어집니다. 이 때, 복숭아들은 포물선을 그리며 떨어질 수 있게 계산식을 활용하였습니다.</li>
    <li>떨어진 복숭아들의 개수 * 10을 점수로 계산합니다.</li>
    <li>Reset 버튼을 누르면 복숭아가 떨어져 비어있는 부분이 다시 채워지며 숫자도 다시 랜덤으로 채워집니다.</li>
    <li>게임이 끝날 때 큰 복숭아에 현재 점수가 표시되며, 현재 점수보다 이전 점수가 더 높다면 best score 로컬스토리지에 이전 점수가 저장되고 현재 점수가 더 높다면 현재 점수가 저장되어 best score 부분에 뜨도록 되어있습니다. 또한 이전 점수 정보가 없다면 현재 점수가 best score에 저장됩니다.</li>
    <li>Reset Best Score를 누르면 로컬스토리지 내의 점수 정보가 삭제되어 다음 플레이 시 best score가 0이 된 상태가 됩니다.</li>
  </ul>
