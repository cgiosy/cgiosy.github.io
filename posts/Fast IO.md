---
title: "C/C++의 입출력 방식 정리, 그리고 Fast IO"
date: "2019-12-20"
tags:
  - 최적화
---

[백준](https://www.acmicpc.net/)이나 [코드포스](https://codeforces.com/) 등의 온라인 저지에서 문제를 풀다 보면 알고리즘 외적으로 최적화가 필요한 경우가 종종 생긴다. 이 때 가장 일반적이고 큰 속도 향상을 기대할 수 있는 방법이 기본 입출력 방법인 `printf`, `scanf` 혹은 `cin`, `cout` 대신 Fast IO를 사용하는 것이다.

아래에서는 알고리즘 문제를 풀 때 입출력을 하는 여러 방법을 제시하고, 각각의 특징을 설명한 뒤, 모든 방법의 속도를 비교하며 마무리한다.

이 블로그에 쓰는 첫 글이라 테스트를 겸하기 위해 일부러 장황하게 썼다. 때문에 읽다 보면 거부감이 들 수 있으며, Fast IO 코드는 글 중후반쯤에 있으니까 바로 코드만 복붙해가는 편을 권장한다.

## 버퍼링

입출력 방법에 대해 말하기 전에 알면 좋은 부분은 버퍼링이다. 메모리에서 데이터를 쓰거나 읽는 것에 비해 실제 파일이나 콘솔에 입출력을 하는 게 더 느리단 건 쉽게 알 수 있을 것이다. 때문에 중간에 임시로 데이터를 저장할 공간인 버퍼를 두어 가능한 적은 횟수의 입출력을 하여 성능을 개선하는 것을 버퍼링이라고 부른다.

프로그래밍 언어들에선 사용자가 불편함을 느끼지 않도록 적절한 처리를 해주기 때문에 이런 부분을 눈치채긴 힘들며, 개발자 역시 입출력 속도가 매우 중요한 경우는 잘 없어 버퍼링의 존재를 모르는 경우도 잦다.

## 기본 입출력

밑의 두 방식을 섞어 쓰는 사람이 있다면, 특별한 이유가 없는 경우 __반드시__ 하나만 선택해 쓰도록 하자.

### printf, scanf

C를 사용하거나 사용했던 사람들이 자주 쓰는 입출력 방식이다. 포맷팅이 약간 더 쉽다는 것을 제외하곤 그리 장점이 없다.

다음과 같이 버퍼 크기를 조정할 수 있다.

```cpp
setvbuf(stdin, NULL, _IOFBF, 16 * (1<<20)); // 16MB
setvbuf(stdout, NULL, _IOFBF, 256 * (1<<10)); // 256KB
```

### cin, cout

C++의 기본 입출력 방식이다. 위와 다르게 형식 지정자를 입력할 필요가 없어 타입 안정성이나 확장성 면에서 유리하며, 일단 속도가 빠르다.

일반적으로 `printf`, `scanf`에 비해 느리다고 알려져 있는데, 기본적으로 C의 입출력 방법과 호환을 위해, 그리고 콘솔에서의 더 나은 사용자 경험을 위해 몇 가지 설정이 되어있기 때문이며, 다음에 해당하는 부분들을 고치고 측정해 보면 상당히 빠른 것을 알 수 있다.

1. `endl`을 `'\n'`으로 바꾸자. 자세한 내용은 검색해보면 나오겠지만, `endl`은 버퍼를 비우기 때문에 자주 사용하면 매우 느려질 수밖에 없다. 단, 코드포스 등에서 인터랙티브 문제를 푼다면 매우 유용하게 사용할 수 있다.
2. `ios_base::sync_with_stdio(false);cin.tie(nullptr);`를 main 함수 최상단에 추가하자. C의 입출력 방식과 호환을 유지하는 옵션을 끄고, `cin`으로 입력받을 때 버퍼를 비우지 않도록 한다.

다음과 같이 버퍼 크기를 조정할 수 있다.

```cpp
char input_buffer[16 * (1<<20)]; // 16MB
cin.rdbuf()->pubsetbuf(input_buffer, 16 * (1<<20));
char output_buffer[256 * (1<<10)]; // 256KB
cout.rdbuf()->pubsetbuf(output_buffer, 256 * (1<<10));
```

## Fast Input

`read`로 입력받는 코드와 `mmap`을 사용하는 방식으로 나뉜다. 입력이 모두 공백 문자(띄어쓰기 및 새 줄) 하나로 나뉘어져 있음을 가정하며, 복붙하기 편하도록 적당히 숏코딩을 해서 쓴다. 짧은 코드라서 알아보긴 어렵지 않을 것이다.

`geti`는 정수를 입력받는다. `getu`는 음수가 아닌 정수를 입력받는다. `int`형 기준으로 작성되었으므로 더 큰 수가 필요하다면 코드의 모든 `int`를 `long long` 등으로 바꾸면 된다.

### read

범용성이 좋고 메모리를 적게 사용하며 속도도 보통 가장 빠르고 최적화의 여지도 있다. 백준에서는 변수를 지역변수로 선언하는 것이 메모리가 작게 잡힌다.

```cpp
#include <unistd.h>
const signed IS=1<<22;
char I[IS],*J=I;
int main() {
	read(0,I,IS);
	auto daer=[&]{if(J>=I+IS-64){char*p=I;do*p++=*J++;while(J!=I+IS);read(0,p,I+IS-p);J=I;}};
	auto getu=[&]{daer();int x=0;do x=x*10+*J-'0';while(*++J>='0');++J;return x;};
	auto geti=[&]{bool e=*J=='-';J+=e;return(e?-1:1)*getu();};
}
```

### mmap

```cpp
#include <sys/stat.h>
#include <sys/mman.h>
signed I[36];char*J=(char*)mmap(0,I[12],1,2,0,fstat(0,(struct stat*)I));
int getu(){int x=0;do x=x*10+*J-'0';while(*++J>='0');++J;return x;}
int geti(){bool e=*J=='-';J+=e;return(e?-1:1)*getu();}
```

### mmap (clang)

clang은 실행 순서가 gcc와 다르기 때문에, fstat을 첫 번째에 두어야 한다. 이외 부분은 동일.

```cpp
#include <sys/stat.h>
#include <sys/mman.h>
signed I[36];char*J=(char*)mmap((void*)fstat(0,(struct stat*)I),I[12],1,2,0,0);
int getu(){int x=0;do x=x*10+*J-'0';while(*++J>='0');++J;return x;}
int geti(){bool e=*J=='-';J+=e;return(e?-1:1)*getu();}
```

## Fast Output

`int`형 기준으로 작성되었으므로 더 큰 수가 필요하다면 코드의 모든 `int`를 `long long` 등으로 바꾸고, `char s[8]`에서 8을 원하는 수로 변경하면 된다.

```cpp
#include <unistd.h>
const signed OS=1<<20;
char O[OS+64],*K=O;
int main() {
	void flush=[&]{write(1,O,K-O);K=O;}
	auto putu=[&](int n){char s[8],*p=s;do*p++=n%10|48;while(n/=10);do*K++=*--p;while(p!=s);*K++=10;if(K>=O+OS)flush();}
	auto puti=[&](int n){if(n<0)*K++='-',n=-n;putu(n);}
	flush();
}
```

## Fast IO

Fast Input과 Fast Output의 코드를 복붙하기 편하게 namespace로 묶은 코드이다. 사소한 주의사항들은 이미 언급하였으니 여기선 생략한다.

```cpp
#include <unistd.h>
namespace io {
	const signed IS=1<<22, OS=1<<20;
	char I[IS],*J=I,O[OS+64],*K=O;
	void daer(){if(J>=I+IS-64){char*p=I;do*p++=*J++;while(J!=I+IS);read(0,p,I+IS-p);J=I;}};
	int getu(){daer();int x=0;do x=x*10+*J-'0';while(*++J>='0');++J;return x;};
	int geti(){daer();bool e=*J=='-';J+=e;return(e?-1:1)*getu();};
	void flush(){write(1,O,K-O);K=O;}
	void putu(int n){char s[8],*p=s;do*p++=n%10|48;while(n/=10);do*K++=*--p;while(p!=s);*K++=10;if(K>=O+OS)flush();}
	void puti(int n){if(n<0)*K++='-',n=-n;putu(n);}
	struct f{f(){read(0,I,IS);}~f(){flush();}}flu;
};
using namespace io;
```

### 개선

[빠른 A+B](https://www.acmicpc.net/problem/15552)에서 cubelover님의 코드를 보면, 주어진 수의 크기가 작다는 점을 이용해서 `while` 대신 `if` 여러 개로 바꾸거나, 출력할 때마다 수를 문자열로 바꾸는 것이 아니라 가능한 수들을 모두 문자열로 미리 바꾸어 놓는 것을 알 수 있다.

위처럼 특수한 경우엔 이 글에서 제시한 코드보다 더욱 빠르게 입출력을 받을 수 있다는 점을 염두에 두자.

## 기타

### GCC 최적화 플래그

clang에선 사용 불가능하다. 대신 기본적으로 최적화나 병렬화를 잘 해주기 때문에 옵션이 필요한 경우는 적다.

각 옵션들은 사용했다가 느려질 수도 있고 빨라질 수도 있으니 여러 가지 시도해 보자. 보통은 O3만 넣는 게 가장 무난하다.

```cpp
#pragma GCC optimize("Ofast")
#pragma GCC optimize("O3")
#pragma GCC optimization("unroll-loops")
#pragma GCC target("arch=avx,avx2,fma")
```

### gcc vs clang

케바케다.

최적화 플래그를 넣지 않은 경우 clang이 보통 더 빠르지만, 간혹 gcc가 나을 때도 있다.

최적화 플래그를 넣는 경우 gcc가 보통 더 빠르지만, 간혹 clang이 나을 때도 있다.

나는 평소에는 clang을 사용하며, 한계까지 최적화했다는 생각이 들면 gcc로 바꿔서 최적화 플래그를 바꿔가며 시험해보는 편이다.

### SIMD

시간복잡도에 /8, /32같은 걸 붙이거나 최적화에 발을 담가보고 싶은 사람들을 위해 좋은 문서들이 있다. 백준과 코드포스에선 AVX2를 지원하니 AVX2를 기준으로 찾아보자.

* [Compiler Vectorization Tutorial](https://software.intel.com/sites/default/files/m/4/8/8/2/a/31848-CompilerAutovectorizationGuide.pdf)
* [Intel CPU Intrinsics Guide (AVX, AVX2, FMA)](https://software.intel.com/sites/landingpage/IntrinsicsGuide/#expand=91,3525,2950,3514&text=_mm&techs=AVX,AVX2,FMA)
* [Parsing series of integers with SIMD](http://0x80.pl/articles/simd-parsing-int-sequences.html)

## 비교

추가 예정

## 결론

Fast IO는 물론 만능이 아니다. 아무리 빠른 입출력 방법을 쓰더라도 알고리즘이 느리다면 시간초과를 피할 수 없고, 애초에 입력이나 출력이 작으면 차이도 없으며, 분별없이 사용했다간 추하다는 소리를 들을 수 있다. 그러나 본인이 가능한 알고리즘 수준에서의 최적화를 모두 했다면, 혹은 실행 시간을 조금이라도 줄여보고 싶은 사람들에게는 필수불가결한 존재임이 분명하다.

백준의 코드 깎는 노인들에게 이 내용이 도움이 되었기를 바라며 이만 글을 마친다.
