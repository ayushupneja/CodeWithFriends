#include <stdio.h>

int main() {
    int arr1[10] = {1,2,3,4,5,6,7,8,9,10};
    int arr2[5] = {-10,3,2,1,4};
    int arr3[3] = {1,-1,4};

    int ans1 = sumArray(arr1,10);
    int ans2 = sumArray(arr2,5);
    int ans3 = sumArray(arr3,3);

    int correct = 0;

    printf("55 %d\n",ans1);
    if (ans1 == 55) correct++;
    printf("0 %d\n",ans2);
    if (ans2 == 0) correct++;
    printf("4 %d\n",ans3);
    if (ans3 == 4) correct++;
    printf("Correct: %d\nTotal: %d",correct,3);
}