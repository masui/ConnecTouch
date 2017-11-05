    <section class="page-header">
      <h1 class="project-name">ConnecTouch</h1>
      <!-- <h2 class="project-tagline">Toshiyuki Masui's passwords</h2> -->
    </section>
    
    <section class="main-content">
      
      <h2><a class="anchor" aria-hidden="true"></a>概要</h2>
      
      駅の券売機やサイネージ、個人のパソコンなどで
      Suicaを使って各種の情報共有/コミュニケーションする実験
      
      <h2><a class="anchor" aria-hidden="true"></a>コンセプト</h2>
      
      <p>
	Suicaで課金したりSuicaにチャージしたりするのはポピュラーになってきた。
	お金の情報がSuicaに入ったりSuicaから出ていったりするイメージはかなり浸透してきたといえるのだろう。
	お金以外の情報を溜めたり出したりすることも理解可能になっていると思われる。
	情報をSuicaに「チャージ」したり利用したりすることに違和感は無いだろう。
      </p>
      
      <p>
	しかしSuica経由で情報を動かすというのはとても<b>直接的</b>な操作である。
	こういう操作だけだと、Suicaは袋のようなもので、袋に何かを入れたり何かを出したりすることしかできない。
      </p>
      
      <p>
	実はSuicaを袋のように使うのはかなりもったいない使い方である。
	<code>Suicaの中に何が入っているか</code>
	だけを利用するのではなく、
	<code>Suicaが他の情報とどう関連づいているか</code>
	のような<b>間接的</b>な情報を利用すれば、はるかに面白い応用が可能になる。
      </p>
      
      <p>
	たとえばA氏がSuicaで秋葉原のサイネージにタッチしたという情報を湘南台のB氏が知ることができれば、
	B氏はA氏に買い物を頼むことができるだろう。
	A氏の行動は普通はプライベートなものであろうが、
	こういう情報がB氏に伝わってもかまわないとあらかじめ登録してあれば共有されても問題ない。
      </p>
      
      <p>
	A氏のSuicaにもB氏のSuicaにも &#147;aikotoba&#148; のような共通の文字列が紐付けされていればこういう連携が可能である。
	A氏のSuicaにはこのような合言葉以外まったく個人情報が含まれていないので紛失などに関して安心であるが、
	A氏とB氏の情報共有は充分できるというわけである。
      </p>
      
      <h2><a class="anchor" aria-hidden="true"></a>プログラム説明</h2>
      
      <ul>
	<li>駅のポスタやサイネージにSuicaでタッチするだけで色々便利になることをデモする</li>
	<li>興味ある情報にアクセスしやすくなったりする</li>
	<li><code>Reader</code>: RFIDリーダを読むPythonプログラム</li>
	<li><code>RememberURL</code>: パソコンで見たURLを登録する拡張機能とサーバのCGI</li>
	<ul>
	  <li>同じとこに置いているが実行環境は別</li>
	</ul>
      </ul>
      
      <h2><a class="anchor" aria-hidden="true"></a>API</h2>
      
      <ul>
	<li><a href="http://ConnecTouch.org/links">リンクのリスト</a></li>
      </ul>
      
      <h2><a class="anchor" aria-hidden="true"></a>デモ</h2>
      
      <ul>
	<li><a href="http://ConnecTouch.org/mv.html">券売機</a></li>
	<li><a href="http://ConnecTouch.org/signage.html">サイネージ</a></li>
      </ul>

    </section>

